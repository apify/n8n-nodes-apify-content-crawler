# n8n Nodes - Apify Integration

This is an n8n community node that integrates [Apify](https://apify.com) with your n8n workflows, enabling seamless web scraping, data extraction, and automation.

[Apify](https://apify.com) is a platform for developers to build, deploy, and publish web automation tools, while [n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation tool that allows you to connect various services.

## Table of Contents

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Resources](#resources)
- [Version History](#version-history)

## Installation

To install this community node, please follow the official [n8n community node installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).

## Operations

This node supports a wide range of Apify operations, including:

- **Actors**: Manage actors and their runs.
  - Fetch actor collections and objects
  - Run actors synchronously
  - Abort, metamorph, or resurrect runs
  - Retrieve the last run object and its storages
- **Actor Tasks**: Automate tasks associated with actors.
  - Manage task collections and objects
  - Run tasks synchronously and retrieve dataset items
  - Fetch the last run object and its storages
- **Datasets**: Work with Apify datasets.
  - Retrieve dataset collections and specific datasets
  - Fetch dataset items

## Credentials

To authenticate, the node uses an Apify API Key. You'll need to configure this in the n8n credentials section under `apifyApi`.

## Compatibility

This node has been tested with n8n version 1.57.0.

## Usage

1. **Create an Actor**: Set up a new actor on [Apify](https://apify.com).
2. **Set up a Workflow**: Create a new workflow in n8n.
3. **Add the Apify Node**: Insert the Apify node into your workflow.
4. **Configure Credentials**: Enter your Apify API key and actor ID.
5. **Select an Operation**: Choose the desired operation for the node.
6. **Execute the Workflow**: Run the workflow to execute the Apify operation.

## Screenshots

Here are some screenshots showcasing the node in action:

![Screenshot 1](./docs/Screenshot%202024-10-06%20at%2001.54.44.png)
![Screenshot 2](./docs/Screenshot%202024-10-06%20at%2002.04.16.png)

## Resources

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify API Documentation](https://docs.apify.com)

## Version History

Track changes and updates to the node here.
