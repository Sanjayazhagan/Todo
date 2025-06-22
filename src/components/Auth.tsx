import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { onAuthStateChanged } from "firebase/auth";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

const Auth = () => {
  const navigate = useNavigate();

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ Logged in user:", user);
      } else {
        console.log("👤 Not logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  // Initialize FirebaseUI
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.reset(); // Prevent duplicate UI
    ui.start("#firebaseui-auth-container", {
      signInFlow: "popup",
      signInOptions: [
        GithubAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
        // Removed EmailAuthProvider
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => {
          console.log("✅ Logged in");
          navigate("/");
          return false; // prevent auto-redirect
        },
        signInFailure: async (error) => {
          if (error.code === "auth/account-exists-with-different-credential") {
            console.log("⚠️ Account exists with different credential");

            const email = (error as any).email;
            const pendingCred = (error as any).credential;

            if (!email || !pendingCred) {
              alert("Something went wrong. Try again.");
              return;
            }

            try {
              const {
                fetchSignInMethodsForEmail,
                signInWithPopup,
                GoogleAuthProvider,
                linkWithCredential,
              } = await import("firebase/auth");

              const methods = await fetchSignInMethodsForEmail(auth, email);

              if (methods.includes(GoogleAuthProvider.PROVIDER_ID)) {
                alert(
                  "You previously signed in with Google. Please sign in with Google first."
                );

                const googleProvider = new GoogleAuthProvider();
                const googleResult = await signInWithPopup(auth, googleProvider);

                await linkWithCredential(googleResult.user, pendingCred);
                alert("✅ GitHub account linked to your Google login.");
                navigate("/");
              } else {
                alert(
                  "Please use the same method you signed up with: " +
                    methods.join(", ")
                );
              }
            } catch (linkError) {
              console.error("❌ Failed to link accounts:", linkError);
              alert("Failed to link accounts. Try again.");
            }

            return Promise.resolve(); // stop FirebaseUI from proceeding
          }

          return Promise.reject(error);
        },
      },
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    });

    return () => {
      ui.reset(); // cleanup
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
      <div id="firebaseui-auth-container" className="w-full max-w-sm"></div>
    </div>
  );
};

export default Auth;
