import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X, Lock, KeyRound, Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// SHA-256 hash for default passcode: "vedant2026"
const PASSCODE_HASH = "f6e795a7be2da5b917c0dc6fe801dbd9f4e7a5d50178d41ff55e8a036b89a16e";

async function hashInput(text: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(text.trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const AdminAuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"passcode" | "token">("passcode");
  const [passcode, setPasscode] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOpen = () => {
      setError("");
      setPasscode("");
      setToken("");
      // If already has token saved, go straight to /admin
      if (localStorage.getItem("github_admin_token")) {
        navigate("/admin");
        return;
      }
      setStep("passcode");
      setIsOpen(true);
    };

    window.addEventListener("open_admin_auth", handleOpen);
    return () => window.removeEventListener("open_admin_auth", handleOpen);
  }, [navigate]);

  const handleVerifyPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError("");

    try {
      const hashed = await hashInput(passcode);
      if (hashed === PASSCODE_HASH) {
        // Passcode correct!
        const existingToken = localStorage.getItem("github_admin_token");
        if (existingToken) {
          setIsOpen(false);
          navigate("/admin");
        } else {
          setStep("token");
        }
      } else {
        setError("Invalid passcode.");
      }
    } catch {
      setError("Verification failed.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim().length < 10) {
      setError("Please enter a valid GitHub Personal Access Token.");
      return;
    }
    localStorage.setItem("github_admin_token", token.trim());
    setIsOpen(false);
    navigate("/admin");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-[#121316] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl text-white font-body"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {step === "passcode" ? (
            <form onSubmit={handleVerifyPasscode}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-wide">Owner Access</h3>
                  <p className="text-xs text-gray-400">Enter master passcode to unlock</p>
                </div>
              </div>

              {error && (
                <div className="mb-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">
                  {error}
                </div>
              )}

              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                autoFocus
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 mb-4 transition-colors"
              />

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Passcode"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSaveToken}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-wide">GitHub Token</h3>
                  <p className="text-xs text-gray-400">Personal Access Token with repo scope</p>
                </div>
              </div>

              {error && (
                <div className="mb-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">
                  {error}
                </div>
              )}

              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                autoFocus
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 mb-4 transition-colors"
              />

              <button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                Unlock Admin Dashboard
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};