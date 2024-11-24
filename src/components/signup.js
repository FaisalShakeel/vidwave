import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { storage } from "../firebaseConfig";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Link } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoUploadProgress, setPhotoUploadProgress] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const handleFileUpload = (e) => {
    const selectedImage = e.target.files[0];
    if (!selectedImage) return;

    const storageRef = ref(storage, `profile_photos/${selectedImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPhotoUploadProgress(progress);
      },
      (error) => {
        setSnackbar({ open: true, message: "Failed to upload photo!", severity: "error" });
      },
      async () => {
        const photoUrl = await getDownloadURL(storageRef);
        setProfilePhotoUrl(photoUrl);
        setSnackbar({ open: true, message: "Profile photo uploaded!", severity: "success" });
        setPhotoUploadProgress(0); // Reset progress
      }
    );
  };

  const handleSignUp = async () => {
    if (!userName || !email || !bio || !password || !profilePhotoUrl) {
      setSnackbar({ open: true, message: "Please fill all fields!", severity: "warning" });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/createaccount", {
        name: userName,
        EMailAddress: email,
        passWord: password,
        bio,
        profilePhotoUrl,
      });

      if (response.data.success) {
        localStorage.setItem("UID", response.data.user._id);
        localStorage.setItem("EMailAddress", response.data.user.EMailAddress);
        localStorage.setItem("passWord", response.data.user.passWord);
        localStorage.setItem("profilePhotoUrl", response.data.user.profilePhotoUrl);

        setSnackbar({ open: true, message: "Account created successfully!", severity: "success" });
        window.location.href = "/home";
      } else if (response.data.message === "AlreadyRegistered") {
        setSnackbar({ open: true, message: "Username is already taken!", severity: "warning" });
      } else {
        setSnackbar({ open: true, message: "Failed to create account!", severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Error occurred during signup!", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "auto",
        padding: "30px",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
        borderRadius: "16px",
        backgroundColor: "#fff",
        fontFamily: "Velyra, Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Velyra",
          marginBottom: "20px",
        }}
      >
        Create Account
      </Typography>

      <Box sx={{ position: "relative", margin: "0 auto 20px", width: "100px", height: "100px" }}>
        <Avatar
          src={profilePhotoUrl || ""}
          sx={{
            width: "100px",
            height: "100px",
            border: "2px solid #1976d2",
          }}
        >
          {!profilePhotoUrl && <CameraAltIcon fontSize="large" />}
        </Avatar>
        <IconButton
          component="label"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #1976d2",
            padding: "5px",
          }}
        >
          <EditIcon />
          <input type="file" hidden onChange={handleFileUpload} />
        </IconButton>
        {photoUploadProgress > 0 && (
          <Box sx={{ marginTop: "10px" }}>
            <Typography variant="body2">{photoUploadProgress}%</Typography>
            <LinearProgress variant="determinate" value={photoUploadProgress} />
          </Box>
        )}
      </Box>

      <TextField
        fullWidth
        label="Username"
        variant="standard"
        margin="normal"
        InputProps={{ style: { fontFamily: "Velyra" } }}
        InputLabelProps={{ style: { fontFamily: "Velyra" } }}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        variant="standard"
        margin="normal"
        InputProps={{ style: { fontFamily: "Velyra" } }}
        InputLabelProps={{ style: { fontFamily: "Velyra" } }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Bio"
        variant="standard"
        margin="normal"
        multiline
        rows={3}
        InputProps={{ style: { fontFamily: "Velyra" } }}
        InputLabelProps={{ style: { fontFamily: "Velyra" } }}
        onChange={(e) => setBio(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="standard"
        margin="normal"
        InputProps={{ style: { fontFamily: "Velyra" } }}
        InputLabelProps={{ style: { fontFamily: "Velyra" } }}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{
          fontFamily: "Velyra",
          marginTop: "20px",
          padding: "10px 0",
        }}
        onClick={handleSignUp}
        disabled={loading}
      >
        Create Account
      </Button>

      <Typography
        variant="body2"
        sx={{
          fontFamily: "Velyra",
          marginTop: "10px",
        }}
      >
        Already Have an Account?{" "}
        <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
          Log In
        </Link>
      </Typography>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbar.severity} onClose={handleSnackbarClose}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SignUp;
