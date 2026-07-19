import { useState, useEffect } from "react";
import { Octokit } from "octokit";
import { motion } from "framer-motion";
import { Save, LogOut, ShieldAlert, CheckCircle2, Loader2, Upload, EyeOff, Eye, Settings, Code2, Type } from "lucide-react";
import dataJson from "../data.json";

export const Admin = () => {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeTab, setActiveTab] = useState<"global" | "projects">("global");

  // Global Settings State
  const [globalSettings, setGlobalSettings] = useState(dataJson.global || {
    profileImage: "/me.png",
    heroTitle: "",
    heroDescription: "",
    aboutTitle: "",
    aboutText1: "",
    aboutText2: ""
  });
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  // Projects State
  const [hiddenRepos, setHiddenRepos] = useState<string[]>([]);
  const [newHiddenRepo, setNewHiddenRepo] = useState("");
  const [projectImages, setProjectImages] = useState<Record<string, string>>({});
  const [uploadRepoName, setUploadRepoName] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("github_admin_token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
    setHiddenRepos(dataJson.hiddenRepos || []);
    setProjectImages(dataJson.projectImages || {});
    setGlobalSettings(dataJson.global || globalSettings);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim().length > 10) {
      localStorage.setItem("github_admin_token", token.trim());
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("github_admin_token");
    setToken("");
    setIsAuthenticated(false);
  };

  const handleAddHiddenRepo = () => {
    if (newHiddenRepo.trim() && !hiddenRepos.includes(newHiddenRepo.trim())) {
      setHiddenRepos([...hiddenRepos, newHiddenRepo.trim()]);
      setNewHiddenRepo("");
    }
  };

  const handleRemoveHiddenRepo = (repo: string) => {
    setHiddenRepos(hiddenRepos.filter(r => r !== repo));
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

      // 1. Get current commit
      const { data: refData } = await octokit.rest.git.getRef({ owner, repo, ref: `heads/${branch}` });
      const commitSha = refData.object.sha;
      const { data: commitData } = await octokit.rest.git.getCommit({ owner, repo, commit_sha: commitSha });
      const treeSha = commitData.tree.sha;

      const tree: any[] = [];

      // 2. Handle Profile Image Upload
      let updatedGlobal = { ...globalSettings };
      if (profileImageFile) {
        const base64Content = await toBase64(profileImageFile);
        const fileName = `profile-${Date.now()}-${profileImageFile.name.replace(/\s+/g, '-').toLowerCase()}`;
        
        const { data: blobData } = await octokit.rest.git.createBlob({
          owner, repo, content: base64Content, encoding: "base64",
        });

        tree.push({
          path: `public/${fileName}`, mode: "100644", type: "blob", sha: blobData.sha,
        });
        updatedGlobal.profileImage = `/${fileName}`;
      }

      // 3. Handle Project Image Upload
      let updatedProjectImages = { ...projectImages };
      if (uploadFile && uploadRepoName.trim()) {
        const base64Content = await toBase64(uploadFile);
        const fileName = uploadFile.name.replace(/\s+/g, '-').toLowerCase();
        
        const { data: blobData } = await octokit.rest.git.createBlob({
          owner, repo, content: base64Content, encoding: "base64",
        });

        tree.push({
          path: `public/projects/${fileName}`, mode: "100644", type: "blob", sha: blobData.sha,
        });
        updatedProjectImages[uploadRepoName.trim()] = `/projects/${fileName}`;
      }

      // 4. Create blob for data.json
      const newDataJson = {
        hiddenRepos,
        projectImages: updatedProjectImages,
        global: updatedGlobal
      };

      const { data: jsonBlob } = await octokit.rest.git.createBlob({
        owner, repo, content: JSON.stringify(newDataJson, null, 2), encoding: "utf-8",
      });

      tree.push({
        path: "src/data.json", mode: "100644", type: "blob", sha: jsonBlob.sha,
      });

      // 5. Create new tree & commit
      const { data: newTree } = await octokit.rest.git.createTree({ owner, repo, base_tree: treeSha, tree });
      const { data: newCommit } = await octokit.rest.git.createCommit({
        owner, repo, message: "Admin Dashboard: Update portfolio content (CMS)", tree: newTree.sha, parents: [commitSha],
      });

      // 6. Update branch ref
      await octokit.rest.git.updateRef({ owner, repo, ref: `heads/${branch}`, sha: newCommit.sha });

      setProjectImages(updatedProjectImages);
      setGlobalSettings(updatedGlobal);
      setUploadFile(null);
      setUploadRepoName("");
      setProfileImageFile(null);
      
      setMessage({ type: "success", text: "Successfully saved! GitHub is rebuilding your site. Changes will appear in ~1 minute." });
    } catch (err: any) {
      setMessage({ type: "error", text: `Error: ${err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onSubmit={handleLogin} 
          className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md"
        >
          <div className="flex items-center gap-3 mb-6 text-white">
            <ShieldAlert className="h-6 w-6 text-cyan-400" />
            <h2 className="text-2xl font-medium">Admin Access</h2>
          </div>
          <input
            type="password" value={token} onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 mb-4"
            required
          />
          <button type="submit" className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-gray-200 transition-colors">
            Authenticate
          </button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl font-medium text-white">Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
          <button 
            onClick={() => setActiveTab("global")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeTab === 'global' ? 'bg-white text-black font-medium' : 'text-gray-400 hover:text-white'}`}
          >
            <Settings className="h-4 w-4" /> Global Settings
          </button>
          <button 
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-white text-black font-medium' : 'text-gray-400 hover:text-white'}`}
          >
            <Code2 className="h-4 w-4" /> Projects
          </button>
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeTab === 'global' ? (
            <>
              {/* Profile Image & Home Config */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h2 className="text-xl font-medium text-white mb-2 flex items-center gap-2">
                  <Upload className="h-5 w-5 text-gray-400" />
                  Home Page Content
                </h2>
                <div className="flex flex-col gap-4 mt-6">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Profile Picture</label>
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-white/10 border-dashed rounded-xl cursor-pointer hover:bg-white/5 hover:border-cyan-400/50 transition-all">
                      <p className="text-sm text-gray-400">
                        {profileImageFile ? profileImageFile.name : "Click to upload new profile picture"}
                      </p>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => setProfileImageFile(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Hero Title</label>
                    <input 
                      type="text" value={globalSettings.heroTitle} 
                      onChange={(e) => setGlobalSettings({...globalSettings, heroTitle: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Hero Description</label>
                    <textarea 
                      value={globalSettings.heroDescription} rows={3}
                      onChange={(e) => setGlobalSettings({...globalSettings, heroDescription: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* About Config */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h2 className="text-xl font-medium text-white mb-2 flex items-center gap-2">
                  <Type className="h-5 w-5 text-gray-400" />
                  About Page Content
                </h2>
                <div className="flex flex-col gap-4 mt-6">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">About Title (Use \n for line breaks)</label>
                    <input 
                      type="text" value={globalSettings.aboutTitle} 
                      onChange={(e) => setGlobalSettings({...globalSettings, aboutTitle: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">About Paragraph 1</label>
                    <textarea 
                      value={globalSettings.aboutText1} rows={4}
                      onChange={(e) => setGlobalSettings({...globalSettings, aboutText1: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">About Paragraph 2</label>
                    <textarea 
                      value={globalSettings.aboutText2} rows={4}
                      onChange={(e) => setGlobalSettings({...globalSettings, aboutText2: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Hidden Repositories */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h2 className="text-xl font-medium text-white mb-2 flex items-center gap-2">
                  <EyeOff className="h-5 w-5 text-gray-400" /> Hidden Repositories
                </h2>
                <div className="flex gap-2 mb-6 mt-4">
                  <input
                    type="text" value={newHiddenRepo} onChange={(e) => setNewHiddenRepo(e.target.value)}
                    placeholder="Repository name (e.g. test-repo)"
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                  <button onClick={handleAddHiddenRepo} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm transition-colors">Add</button>
                </div>
                <div className="flex flex-col gap-2">
                  {hiddenRepos.map(repo => (
                    <div key={repo} className="flex items-center justify-between bg-black/30 border border-white/5 px-4 py-3 rounded-xl">
                      <span className="text-gray-300 text-sm">{repo}</span>
                      <button onClick={() => handleRemoveHiddenRepo(repo)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                    </div>
                  ))}
                  {hiddenRepos.length === 0 && <div className="text-gray-500 text-sm italic text-center py-4">No hidden repositories.</div>}
                </div>
              </div>

              {/* Project Images */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h2 className="text-xl font-medium text-white mb-2 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-gray-400" /> Project Images
                </h2>
                <div className="flex flex-col gap-4 mb-6 mt-4">
                  <input
                    type="text" value={uploadRepoName} onChange={(e) => setUploadRepoName(e.target.value)}
                    placeholder="Repository name (e.g. ai-chatbot)"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-white/10 border-dashed rounded-xl cursor-pointer hover:bg-white/5 hover:border-cyan-400/50 transition-all">
                    <p className="text-sm text-gray-400">{uploadFile ? uploadFile.name : "Click to upload image"}</p>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Current Mappings</h3>
                <div className="flex flex-col gap-2">
                  {Object.entries(projectImages).map(([repo, img]) => (
                    <div key={repo} className="flex items-center justify-between bg-black/30 border border-white/5 px-4 py-3 rounded-xl">
                      <span className="text-gray-300 text-sm font-medium">{repo}</span>
                      <span className="text-gray-500 text-xs truncate max-w-[120px]">{img}</span>
                    </div>
                  ))}
                  {Object.keys(projectImages).length === 0 && <div className="text-gray-500 text-sm italic text-center py-4">No images configured.</div>}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave} disabled={isSaving}
            className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            {isSaving ? "Saving & Deploying..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
