import { useState, useEffect } from "react";
import { Octokit } from "octokit";
import { motion } from "framer-motion";
import { Save, LogOut, ShieldAlert, CheckCircle2, Loader2, Upload, EyeOff, Eye, Settings, Code2, Type, Star, Globe } from "lucide-react";
import dataJsonStatic from "../data.json";

export const Admin = () => {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeTab, setActiveTab] = useState<"global" | "projects" | "skills">("global");
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Global Settings State
  const [globalSettings, setGlobalSettings] = useState(dataJsonStatic.global || {
    profileImage: "/me.png",
    heroTitle: "",
    heroDescription: "",
    aboutTitle: "",
    aboutText1: "",
    aboutText2: "",
    roles: [],
    expertise: []
  });
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Skills State
  const [roles, setRoles] = useState<string[]>(globalSettings.roles || []);
  const [newRole, setNewRole] = useState("");
  const [expertise, setExpertise] = useState<any[]>(globalSettings.expertise || []);

  // Projects State
  const [hiddenRepos, setHiddenRepos] = useState<string[]>(dataJsonStatic.hiddenRepos || []);
  const [newHiddenRepo, setNewHiddenRepo] = useState("");
  const [projectImages, setProjectImages] = useState<Record<string, string>>(dataJsonStatic.projectImages || {});
  const [projectLinks, setProjectLinks] = useState<Record<string, string>>((dataJsonStatic as any).projectLinks || {});
  const [uploadRepoName, setUploadRepoName] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [linkRepoName, setLinkRepoName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("github_admin_token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchLiveConfig(savedToken);
    }
  }, []);

  const fetchLiveConfig = async (authToken: string) => {
    setIsLoadingData(true);
    try {
      const octokit = new Octokit({ auth: authToken });
      const { data } = await octokit.rest.repos.getContent({
        owner: "Vedant021004",
        repo: "Vedant021004.github.io",
        path: "src/data.json",
        ref: "main"
      });
      
      if ('content' in data) {
        const decoded = JSON.parse(atob(data.content));
        setHiddenRepos(decoded.hiddenRepos || []);
        setProjectImages(decoded.projectImages || {});
        setProjectLinks(decoded.projectLinks || {});
        setGlobalSettings(decoded.global || globalSettings);
        setRoles(decoded.global?.roles || []);
        setExpertise(decoded.global?.expertise || []);
      }
    } catch (e) {
      console.error("Failed to fetch live config, using bundled version.", e);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim().length > 10) {
      localStorage.setItem("github_admin_token", token.trim());
      setIsAuthenticated(true);
      await fetchLiveConfig(token.trim());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("github_admin_token");
    setToken("");
    setIsAuthenticated(false);
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: "", text: "" });
    try {
      const octokit = new Octokit({ auth: token });
      const owner = "Vedant021004";
      const repo = "Vedant021004.github.io";
      const branch = "main";

      const { data: refData } = await octokit.rest.git.getRef({ owner, repo, ref: `heads/${branch}` });
      const commitSha = refData.object.sha;
      const { data: commitData } = await octokit.rest.git.getCommit({ owner, repo, commit_sha: commitSha });
      const treeSha = commitData.tree.sha;

      const tree: any[] = [];

      let updatedGlobal = { ...globalSettings, roles, expertise };
      if (profileImageFile) {
        const base64Content = await toBase64(profileImageFile);
        const fileName = `profile-${Date.now()}-${profileImageFile.name.replace(/\s+/g, '-').toLowerCase()}`;
        
        const { data: blobData } = await octokit.rest.git.createBlob({
          owner, repo, content: base64Content, encoding: "base64",
        });

        tree.push({ path: `public/${fileName}`, mode: "100644", type: "blob", sha: blobData.sha });
        updatedGlobal.profileImage = `/${fileName}`;
      }

      if (resumeFile) {
        const base64Content = await toBase64(resumeFile);
        const { data: blobData } = await octokit.rest.git.createBlob({
          owner, repo, content: base64Content, encoding: "base64",
        });
        tree.push({ path: "public/resume.pdf", mode: "100644", type: "blob", sha: blobData.sha });
      }

      let updatedProjectImages = { ...projectImages };
      if (uploadFile && uploadRepoName.trim()) {
        const base64Content = await toBase64(uploadFile);
        const fileName = uploadFile.name.replace(/\s+/g, '-').toLowerCase();
        
        const { data: blobData } = await octokit.rest.git.createBlob({
          owner, repo, content: base64Content, encoding: "base64",
        });

        tree.push({ path: `public/projects/${fileName}`, mode: "100644", type: "blob", sha: blobData.sha });
        updatedProjectImages[uploadRepoName.trim()] = `/projects/${fileName}`;
      }

      let updatedProjectLinks = { ...projectLinks };
      if (linkRepoName.trim() && linkUrl.trim()) {
        updatedProjectLinks[linkRepoName.trim()] = linkUrl.trim();
      }

      const newDataJson = {
        hiddenRepos,
        projectImages: updatedProjectImages,
        projectLinks: updatedProjectLinks,
        global: updatedGlobal
      };

      const { data: jsonBlob } = await octokit.rest.git.createBlob({
        owner, repo, content: JSON.stringify(newDataJson, null, 2), encoding: "utf-8",
      });

      tree.push({ path: "src/data.json", mode: "100644", type: "blob", sha: jsonBlob.sha });

      const { data: newTree } = await octokit.rest.git.createTree({ owner, repo, base_tree: treeSha, tree });
      const { data: newCommit } = await octokit.rest.git.createCommit({
        owner, repo, message: "Admin Dashboard: Update portfolio CMS", tree: newTree.sha, parents: [commitSha],
      });

      await octokit.rest.git.updateRef({ owner, repo, ref: `heads/${branch}`, sha: newCommit.sha });

      // INSTANT UI UPDATE
      localStorage.setItem('portfolio_data', JSON.stringify(newDataJson));
      window.dispatchEvent(new Event('portfolio_data_updated'));

      setProjectImages(updatedProjectImages);
      setProjectLinks(updatedProjectLinks);
      setGlobalSettings(updatedGlobal);
      setUploadFile(null);
      setUploadRepoName("");
      setLinkRepoName("");
      setLinkUrl("");
      setProfileImageFile(null);
      setResumeFile(null);
      
      setMessage({ type: "success", text: "Successfully saved! GitHub is rebuilding your site. Changes will appear in ~1 minute." });
    } catch (err: any) {
      setMessage({ type: "error", text: `Error: ${err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 transition-colors duration-500">
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onSubmit={handleLogin} 
          className="w-full max-w-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-8 rounded-3xl backdrop-blur-md"
        >
          <div className="flex items-center gap-3 mb-6 text-black dark:text-white">
            <ShieldAlert className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
            <h2 className="text-2xl font-medium">Admin Access</h2>
          </div>
          <input
            type="password" value={token} onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="w-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:border-cyan-400 mb-4"
            required
          />
          <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black font-medium py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
            Authenticate
          </button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 transition-colors duration-500">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-4xl font-medium text-black dark:text-white transition-colors">Dashboard</h1>
            {isLoadingData && <Loader2 className="h-5 w-5 text-cyan-500 animate-spin" title="Fetching live data..." />}
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-8 border-b border-black/10 dark:border-white/10 pb-4">
          <button 
            onClick={() => setActiveTab("global")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeTab === 'global' ? 'bg-black dark:bg-white text-white dark:text-black font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
          >
            <Settings className="h-4 w-4" /> Global
          </button>
          <button 
            onClick={() => setActiveTab("skills")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeTab === 'skills' ? 'bg-black dark:bg-white text-white dark:text-black font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
          >
            <Star className="h-4 w-4" /> Skills
          </button>
          <button 
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-black dark:bg-white text-white dark:text-black font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
          >
            <Code2 className="h-4 w-4" /> Projects
          </button>
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'}`}>
            {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activeTab === 'global' && (
            <>
              {/* Profile Image & Home Config */}
              <div className="border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-3xl p-6 transition-colors">
                <h2 className="text-xl font-medium text-black dark:text-white mb-2 flex items-center gap-2">
                  <Upload className="h-5 w-5 text-gray-500" />
                  Home Page Content
                </h2>
                <div className="flex flex-col gap-4 mt-6">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Profile Picture</label>
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-black/10 dark:border-white/10 border-dashed rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                      <p className="text-sm text-gray-500">
                        {profileImageFile ? profileImageFile.name : "Click to upload new profile picture"}
                      </p>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => setProfileImageFile(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Resume (PDF)</label>
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-black/10 dark:border-white/10 border-dashed rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                      <p className="text-sm text-gray-500">
                        {resumeFile ? resumeFile.name : "Click to upload new resume"}
                      </p>
                      <input type="file" accept="application/pdf" className="hidden" onChange={(e) => setResumeFile(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Hero Title</label>
                    <input 
                      type="text" value={globalSettings.heroTitle} 
                      onChange={(e) => setGlobalSettings({...globalSettings, heroTitle: e.target.value})}
                      className="w-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-black dark:text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Hero Description</label>
                    <textarea 
                      value={globalSettings.heroDescription} rows={3}
                      onChange={(e) => setGlobalSettings({...globalSettings, heroDescription: e.target.value})}
                      className="w-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-black dark:text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* About Config */}
              <div className="border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-3xl p-6 transition-colors">
                <h2 className="text-xl font-medium text-black dark:text-white mb-2 flex items-center gap-2">
                  <Type className="h-5 w-5 text-gray-500" />
                  About Page Content
                </h2>
                <div className="flex flex-col gap-4 mt-6">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">About Title (Use \n for line breaks)</label>
                    <input 
                      type="text" value={globalSettings.aboutTitle} 
                      onChange={(e) => setGlobalSettings({...globalSettings, aboutTitle: e.target.value})}
                      className="w-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-black dark:text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">About Paragraph 1</label>
                    <textarea 
                      value={globalSettings.aboutText1} rows={4}
                      onChange={(e) => setGlobalSettings({...globalSettings, aboutText1: e.target.value})}
                      className="w-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-black dark:text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">About Paragraph 2</label>
                    <textarea 
                      value={globalSettings.aboutText2} rows={4}
                      onChange={(e) => setGlobalSettings({...globalSettings, aboutText2: e.target.value})}
                      className="w-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-black dark:text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'skills' && (
            <>
              {/* Roles Config */}
              <div className="border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-3xl p-6 transition-colors">
                <h2 className="text-xl font-medium text-black dark:text-white mb-2 flex items-center gap-2">
                  <Type className="h-5 w-5 text-gray-500" /> Rotating Roles
                </h2>
                <div className="flex gap-2 mb-6 mt-4">
                  <input
                    type="text" value={newRole} onChange={(e) => setNewRole(e.target.value)}
                    placeholder="E.g. AI Researcher"
                    className="flex-1 bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-black dark:text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                  <button 
                    onClick={() => {
                      if (newRole.trim()) { setRoles([...roles, newRole.trim()]); setNewRole(""); }
                    }} 
                    className="bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-black dark:text-white px-4 py-2 rounded-xl text-sm transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {roles.map(r => (
                    <div key={r} className="flex items-center justify-between bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/5 px-4 py-3 rounded-xl">
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{r}</span>
                      <button onClick={() => setRoles(roles.filter(x => x !== r))} className="text-red-500 dark:text-red-400 text-sm">Remove</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expertise Config */}
              <div className="border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-3xl p-6 transition-colors">
                <h2 className="text-xl font-medium text-black dark:text-white mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-gray-500" /> Core Expertise
                </h2>
                <div className="flex flex-col gap-4">
                  {expertise.map((exp, idx) => (
                    <div key={idx} className="bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/5 p-4 rounded-xl flex flex-col gap-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500 font-medium uppercase">Expertise #{idx + 1}</span>
                        <button onClick={() => setExpertise(expertise.filter((_, i) => i !== idx))} className="text-red-500 text-xs">Remove</button>
                      </div>
                      <input 
                        type="text" value={exp.title} placeholder="Title"
                        onChange={(e) => {
                          const newExp = [...expertise]; newExp[idx].title = e.target.value; setExpertise(newExp);
                        }}
                        className="w-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-lg px-3 py-1.5 text-black dark:text-white text-sm focus:outline-none"
                      />
                      <input 
                        type="text" value={exp.icon} placeholder="Icon (e.g. Brain, Code)"
                        onChange={(e) => {
                          const newExp = [...expertise]; newExp[idx].icon = e.target.value; setExpertise(newExp);
                        }}
                        className="w-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-lg px-3 py-1.5 text-black dark:text-white text-sm focus:outline-none"
                      />
                      <textarea 
                        value={exp.description} placeholder="Description" rows={2}
                        onChange={(e) => {
                          const newExp = [...expertise]; newExp[idx].description = e.target.value; setExpertise(newExp);
                        }}
                        className="w-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-lg px-3 py-1.5 text-black dark:text-white text-sm focus:outline-none"
                      />
                    </div>
                  ))}
                  <button 
                    onClick={() => setExpertise([...expertise, { title: "New Skill", icon: "Code", description: "" }])}
                    className="w-full py-2 border border-dashed border-black/20 dark:border-white/20 rounded-xl text-gray-500 hover:text-black dark:hover:text-white hover:border-black/50 dark:hover:border-white/50 transition-all text-sm"
                  >
                    + Add Expertise Card
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'projects' && (
            <>
              {/* Hidden Repositories */}
              <div className="border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-3xl p-6 transition-colors">
                <h2 className="text-xl font-medium text-black dark:text-white mb-2 flex items-center gap-2">
                  <EyeOff className="h-5 w-5 text-gray-500" /> Hidden Repositories
                </h2>
                <div className="flex gap-2 mb-6 mt-4">
                  <input
                    type="text" value={newHiddenRepo} onChange={(e) => setNewHiddenRepo(e.target.value)}
                    placeholder="Repository name (e.g. test-repo)"
                    className="flex-1 bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-black dark:text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                  <button onClick={() => { if (newHiddenRepo) { setHiddenRepos([...hiddenRepos, newHiddenRepo]); setNewHiddenRepo(""); }}} className="bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-black dark:text-white px-4 py-2 rounded-xl text-sm transition-colors">Add</button>
                </div>
                <div className="flex flex-col gap-2">
                  {hiddenRepos.map(repo => (
                    <div key={repo} className="flex items-center justify-between bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/5 px-4 py-3 rounded-xl">
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{repo}</span>
                      <button onClick={() => setHiddenRepos(hiddenRepos.filter(r => r !== repo))} className="text-red-500 dark:text-red-400 text-sm">Remove</button>
                    </div>
                  ))}
                  {hiddenRepos.length === 0 && <div className="text-gray-500 text-sm italic text-center py-4">No hidden repositories.</div>}
                </div>
              </div>

              {/* Project Images */}
              <div className="border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-3xl p-6 transition-colors">
                <h2 className="text-xl font-medium text-black dark:text-white mb-2 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-gray-500" /> Project Images
                </h2>
                <div className="flex flex-col gap-4 mb-6 mt-4">
                  <input
                    type="text" value={uploadRepoName} onChange={(e) => setUploadRepoName(e.target.value)}
                    placeholder="Repository name (e.g. ai-chatbot)"
                    className="w-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-black dark:text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-black/10 dark:border-white/10 border-dashed rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                    <p className="text-sm text-gray-500">{uploadFile ? uploadFile.name : "Click to upload image"}</p>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-3">Current Mappings</h3>
                <div className="flex flex-col gap-2">
                  {Object.entries(projectImages).map(([repo, img]) => (
                    <div key={repo} className="flex items-center justify-between bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/5 px-4 py-3 rounded-xl">
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{repo}</span>
                      <span className="text-gray-500 text-xs truncate max-w-[120px]">{img}</span>
                    </div>
                  ))}
                  {Object.keys(projectImages).length === 0 && <div className="text-gray-500 text-sm italic text-center py-4">No images configured.</div>}
                </div>
              </div>

              {/* Project Links / Demos */}
              <div className="border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-3xl p-6 transition-colors mt-8">
                <h2 className="text-xl font-medium text-black dark:text-white mb-2 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-gray-500" /> Live Demo Links
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Add a "Live Demo" button to your projects.</p>
                <div className="flex flex-col md:flex-row gap-2 mb-6 mt-4">
                  <input
                    type="text" value={linkRepoName} onChange={(e) => setLinkRepoName(e.target.value)}
                    placeholder="Repo name (e.g. ai-chatbot)"
                    className="flex-1 bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-black dark:text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="URL (e.g. https://demo.com)"
                    className="flex-1 bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-black dark:text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                  <button onClick={() => { if (linkRepoName && linkUrl) { setProjectLinks({...projectLinks, [linkRepoName]: linkUrl}); setLinkRepoName(""); setLinkUrl(""); }}} className="bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-black dark:text-white px-4 py-2 rounded-xl text-sm transition-colors">Add</button>
                </div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-3">Current Demo Links</h3>
                <div className="flex flex-col gap-2">
                  {Object.entries(projectLinks).map(([repo, url]) => (
                    <div key={repo} className="flex items-center justify-between bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/5 px-4 py-3 rounded-xl">
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{repo}</span>
                      <a href={url} target="_blank" rel="noreferrer" className="text-cyan-500 hover:underline text-xs truncate max-w-[120px]">{url}</a>
                      <button onClick={() => { const newLinks = {...projectLinks}; delete newLinks[repo]; setProjectLinks(newLinks); }} className="text-red-500 dark:text-red-400 text-xs ml-4">Remove</button>
                    </div>
                  ))}
                  {Object.keys(projectLinks).length === 0 && <div className="text-gray-500 text-sm italic text-center py-4">No demo links configured.</div>}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave} disabled={isSaving}
            className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            {isSaving ? "Saving & Deploying..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
