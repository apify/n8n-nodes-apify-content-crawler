# n8n-nodes-apify

This is an n8n community node. It lets you use apify in your n8n workflows.

Apify is the platform where developers build, deploy, and publish
web scraping, data extraction, and web automation tools.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials) <!-- delete if no auth needed -->  
[Compatibility](#compatibility)  
[Usage](#usage) <!-- delete if not using this section -->  
[Resources](#resources)  
[Version history](#version-history) <!-- delete if not using this section -->

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

# Screenshots

![](./docs/Screenshot%202024-10-06%20at%2001.54.44.png)

![](./docs//Screenshot%202024-10-06%20at%2002.04.16.png)

## Operations

The node supports the following operations:

- Actors/Actor collection
- Actors/Actor object
- Actors/Run collection
- Actors/Run actor synchronously
- Actors/Run Actor synchronously and get dataset items
- Actors/Run object
- Actors/Abort run
- Actors/Metamorph run
- Actors/Resurrect run
- Actors/Last run object and its storages
- Actor tasks/Task collection
- Actor tasks/Task object
- Actor tasks/Task input object
- Actor tasks/Run collection
- Actor tasks/Run task synchronously
- Actor tasks/Run task synchronously and get dataset items
- Actor tasks/Last run object and its storages
- Datasets
- Datasets/Dataset collection
- Datasets/Dataset
- Datasets/Item collection

## Credentials

The node supports the API Key authentication method `apifyApi` that is required to authenticate with the Apify API.

## Compatibility

Tested against n8n version 1.57.0.

## Usage

1. Create a new actor on Apify.
2. Create a new workflow in n8n.
3. Add the Apify node to your workflow.
4. Enter your API key and actor ID.
5. Select the operation you want to perform.
6. Execute the node.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify documentation](https://apify.com/docs/)
