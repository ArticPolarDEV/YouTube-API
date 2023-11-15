const express = require('express');
const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const router = express.Router();

// Get Version
function getDependencyVersion(dependencyName) {
  // Read the package.json file
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

  // Check if the dependency is listed in dependencies or devDependencies
  const version = packageJson.dependencies[dependencyName] || packageJson.devDependencies[dependencyName];

  // Remove the "^" character if present
  return version ? version.replace('^', '') : null;
}


// define the home page route
router.get('/', (req, res) => {
  try {
    res.status(200).json({
        "ytdl-core": getDependencyVersion("ytdl-core"),
        "express": getDependencyVersion("express"),
        "dotenv": getDependencyVersion("dotenv"),
        "body-parser": getDependencyVersion("body-parser"),
        "express-session": getDependencyVersion("express-session"),
        "nodemon": getDependencyVersion("nodemon"),
        "serve-favicon": getDependencyVersion("serve-favicon"),
        "vercel/node": getDependencyVersion("@vercel/node")
    });
  }
  catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send("Error retrieving Dependency Version");
  }
});

module.exports = router;