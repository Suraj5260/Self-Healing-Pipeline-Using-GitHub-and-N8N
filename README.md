# Self-Healing Pipeline Using GitHub and n8n

This project implements an automated, self-healing CI/CD pipeline leveraging GitHub Actions and n8n, with AI-powered code suggestions using Google's Gemini model.

## Overview

When a continuous integration pipeline fails, this system automatically intervenes to identify the cause, suggest a fix, and create a pull request with the corrected code, notifying the developer via email.

## Workflow Details

The self-healing process is triggered automatically by a CI/CD pipeline failure and follows these steps within the n8n workflow:

1. **GitHub Failure Webhook**: Listens for failed workflow runs.
2. **Fetch Logs**: Retrieves the error logs from the failed GitHub Action.
3. **Fetch Changed Files**: Identifies which files were modified in the commit that caused the failure.
4. **Fetch File Content**: Gets the actual content of the changed files.
5. **Data Extraction (JavaScript)**: Custom JavaScript code processes the file changes and logs to prepare the context.
6. **AI Analysis (Gemini)**: The prepared context is sent to the Gemini AI model to analyze the error and suggest code changes.
7. **Extract AI Response (JavaScript)**: Custom JavaScript extracts the exact suggested code fix from the Gemini response.
8. **Create Branch**: A new branch is created in the repository for the fix.
9. **Collect SHA Token**: Retrieves the necessary file SHA to update the file via the GitHub API.
10. **Push Fixed File**: Commits the AI-suggested code changes to the new branch.
11. **Create Pull Request**: Opens a PR against the main branch with the proposed fix.
12. **Email Notification**: Sends an email to the user notifying them that a fix PR has been raised, including a direct link to the PR.

## Core Components

- **GitHub Actions**: The primary CI/CD runner where pipeline failures occur.
- **n8n**: The workflow automation tool orchestrating the self-healing process.
- **Google Gemini**: The AI model responsible for analyzing errors and writing the code fix.
- **JavaScript Nodes**: Custom scripts within n8n used for data manipulation and extraction.

## Infrastructure & Hosting

To avoid the costs of a paid n8n subscription, this project uses a fully local setup exposed to the internet:
- **Local Docker Container**: n8n is hosted locally using Docker Desktop.
- **ngrok Tunneling**: To allow GitHub to send failure Webhooks to the local n8n instance, `ngrok` is used to create a secure tunnel. This free service exposes the local Docker container to the internet with a public URL.
<img width="1024" height="450" alt="image" src="https://github.com/user-attachments/assets/64006627-e068-44c7-b21d-84fc4c32353a" />
