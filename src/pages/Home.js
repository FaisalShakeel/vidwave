import React from "react";
import Layout from "../components/Layout";
import { Grid, Card, CardContent, Typography, Box, Avatar, Divider, Chip, IconButton } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";

const HomePage = () => {
  // Simulating some video data
  const categories = ["Trending", "Music", "Gaming", "Sports", "News", "Comedy", "Tech"];
  const videos = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    title: `Video Title ${i + 1}`,
    thumbnail: "https://via.placeholder.com/250x140",
    views: `${(Math.random() * 10000).toFixed(0)} views`,
    uploader: "User Name",
    uploaderAvatar: "https://via.placeholder.com/40",
    timeAgo: `${(Math.random() * 60).toFixed(0)} minutes ago`,
  }));

  const [selectedCategory, setSelectedCategory] = React.useState("Trending");
  const [showSlider, setShowSlider] = React.useState(false);

  return (
    <Layout>
      {/* Category Selection Section */}
      <Box sx={{ padding: 2, backgroundColor: "#fff", borderBottom: "1px solid #ddd" }}>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item key={category}>
              <Chip
                label={category}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  cursor: "pointer",
                  fontFamily: "Velyra",
                  backgroundColor: selectedCategory === category ? "#0077ff" : "#f1f5fc",
                  color: selectedCategory === category ? "#fff" : "#333",
                  ":hover": { backgroundColor: "#0077ff", color: "#fff" },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Video Grid Section */}
      <Grid container spacing={3} sx={{ padding: 3, backgroundColor: "#fff" }}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Card
              sx={{
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                "&:hover": { transform: "scale(1.05)", transition: "0.3s ease" },
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                style={{
                  width: "100%",
                  borderRadius: "4px 4px 0 0",
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ padding: 2, flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Velyra",
                    color: "#333",
                    fontWeight: "bold",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                  }}
                >
                  {video.title}
                </Typography>

                {/* Video Information */}
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={video.uploaderAvatar}
                      sx={{ width: 24, height: 24, marginRight: 1 }}
                    />
                    <Typography variant="body2" sx={{ color: "#555", fontSize: "0.875rem" }}>
                      {video.uploader}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "#555", fontSize: "0.875rem" }}>
                    {video.views} • {video.timeAgo}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Right Slide-In Video Showcase */}
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          backgroundColor: "#0077ff",
          padding: 2,
          borderRadius: "10px 0 0 10px",
          display: showSlider ? "block" : "none",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          zIndex: 999,
        }}
      >
        <IconButton
          sx={{ color: "#fff", borderRadius: "50%" }}
          onClick={() => setShowSlider(!showSlider)}
        >
          <ArrowDownward />
        </IconButton>
        <Typography variant="h6" sx={{ color: "#fff", marginTop: 2 }}>
          Featured Videos
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {videos.slice(0, 3).map((video) => (
            <Grid item xs={12} key={video.id}>
              <Card sx={{ display: "flex", backgroundColor: "#fff", borderRadius: "8px" }}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{
                    width: 80,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: "8px 0 0 8px",
                  }}
                />
                <CardContent sx={{ padding: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Velyra",
                      color: "#333",
                      fontWeight: "bold",
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {video.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default HomePage;
