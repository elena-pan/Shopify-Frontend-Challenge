
# Marstagram - Shopify Frontend Challenge

https://elena-pan.github.io/Shopify-Frontend-Challenge/

A web application that calculates pulls images from NASA's Mars Rover Photos API and displays them with descriptive data, as well as allowing users to like and unlike images. The user's likes are saved even if they leave or refresh the page.


[Features](#features) \
[Project Structure](#project-structure) \
[Pre-installation Requirements](#pre-installation-requirements) \
[Installation](#installation)

## Features
* The application queries NASA's API for photos from the Mars Rovers and displays a loading screen while the data is being fetched
* Once the data is fetched, the images are displayed in a grid system with descriptive data, which can be expanded upon clicking the card
* Users can like and unlike images, and their likes persist upon leaving or refreshing the page

#### Frameworks and Libraries
* React
* MaterializeCSS

## Project Structure

```
├── public                    -- Static files
├── src                       -- Client entry point
    ├── components
    │   ├── layout            -- Layout components (header, footer, etc)
    │   └── pages             -- Main application page

```

## Pre-Installation Requirements

Marstagram requires at least version 14.x of [Node.js](https://nodejs.org/en/) (which comes with [npm](http://npmjs.com/)).

## Installation

To complete the setup and run the application, navigate into the root directory of the project and run

```cmd
$ npm start
```

The application will be hosted at
[http://localhost:3000](http://localhost:3000)
