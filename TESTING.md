<h1 id="contents">foodSNAP Frontend Testing</h1>

Back to the [README](README.md)

The backend testing repository can be found <a href="https://github.com/artcuddy/project5-foodsnap-backend/blob/main/TESTING.md" target="_blank">**HERE**</a><br>

<h1 id="contents">Contents</h1>

-   [Introduction](#introduction)
-   [Manual Testing](#manual-testing)
-   [Automated Testing](#automated-testing)
-   [Messaging / Alerts](#messaging)
-   [ESlint](#eslint-validation)
-   [HTML](#html-validation)
-   [CSS](#css-validation)
-   [Console Results](#console-results)
-   [Lighthouse](#lighthouse)
    -   [Desktop](#lighthouse-desktop)
    -   [Mobile](#lighthouse-mobile)
-   [Bugs / Issues](#bugs)

<h1 id="introduction">Introduction</h1>

Project Milestone 5 for Code Institute Full-stack development program. foodSNAP - all testing results and code validation can be found here. <br>
Testing has taken place continuously throughout the development of the project. The app was tested regularly and deployed early to Heroku to confirm local and remote functioned the same.

<h1 id="manual-testing">Manual Functional Testing Results</h1>

<a href="#top">Back to the top</a>

<details><summary>Click here to expand: Manual Test Case</summary>

![Manual Test Case](documentation/readme_images/testing/cocktail-nerd-manual-testing.webp)

</details>

<br/>
The online version of the Manual Functional Test Case can be found here <a href="https://docs.google.com/spreadsheets/d/1httv3Y2IJjzV_sj7WBncre5ICvjTv1ODlphDvt8Yrj8/edit#gid=0" target="_blank">**HERE**</a><br>

<h1 id="automated-testing">Automated Unit Testing Results</h1>

### Before Automated Unit testing coverage was at 79%

<br />

<h1 id="html-validation">Messaging / Alerts</h1>

<h2>Authentication</h2>

-   On the sign in page if a user submits a password that does not meet the requirments a warning alert will be displayed explaining the reason it failed.

![Sign In](documentation/testing/signin.webp)

-   On the sign up page if a user submits a password that does not meet the requirments a warning alert will be displayed explaining the reason it failed.

![Sign Up](documentation/testing/signup.webp)

-   Logged in success alert with username top left of the screen.

![Logged In](documentation/messaging/loggedin-success.webp)

-   Logged out success alert top left of the screen.

![Logged Out](documentation/messaging/loggedout-success.webp)

<h2>foodSNAPS</h2>

-   foodSNAP created success alert top left of the screen.

![Created](documentation/messaging/created-success.webp)

-   foodSNAP edited success alert top left of the screen.

![Edited](documentation/messaging/edited-success.webp)

-   When the delete foodSNAP icon is clicked a confirmation modal pops up to confirm the action to prevent accidental deletions.

![Deleted](documentation/messaging/post-delete-confirm.webp)

-   Once the action is confirmed foodSNAP deleted success alert top left of the screen and foodSNAP is deleted.

![Deleted](documentation/messaging/deleted-success.webp)

<h2>Comments</h2>

-   Comment created success alert top left of the screen.

![Created](documentation/messaging/comment-created.webp)

-   Comment edited success alert top left of the screen.

![Edited](documentation/messaging/comment-edited.webp)

-   When the deletecomment icon is clicked a confirmation modal pops up to confirm the action to prevent accidental deletions.

![Deleted](documentation/messaging/post-delete-confirm.webp)

-   Once the action is confirmed comment deleted success alert top left of the screen and comment is deleted.

![Deleted](documentation/messaging/comment-deleted.webp)

<h2>Likes</h2>

-   foodSNAP liked success alert top left of the screen.

![Created](documentation/messaging/liked.webp)


-   foodSNAP unliked success alert top left of the screen.

![Created](documentation/messaging/unliked.webp)




<h1 id="html-validation">HTML Validation</h1>

![HTML Validation Result](documentation/testing/html-validator-results.webp)

<h1 id="css-validation">CSS Validation</h1>

![W3C CSS Validation Result](documentation/testing/css-validator-results.webp)

-   Custom CSS was validated using W3C Jigsaw validation service. One warning was displayed, however,
    this is related to Bootstrap 5 which will not affect the CSS performance.

<h1 id="console-results">Console Results</h1>

<a href="#top">Back to the top</a>

<h2 id="console-loggedout">Logged Out</h2>

![Logged out Dev Console Result](documentation/testing/logged-out-dev.webp)

-   The browser console shows 3 errors related to authentication as is expected as the user is not logged in.

<h2 id="console-loggedin">Logged In</h2>

![Logged in Dev Console Result](documentation/testing/logged-in-dev.webp)

-   The browser console is clean, no errors are displayed.

<h1 id="lightHouse">Lighthouse</h1>

Lighthouse was used to test Performance, Best Practices, Accessibility and SEO on Desktop and Mobile.

<h2 id="lighthouse-desktop">Desktop</h2>

![Desktop results](documentation/testing/lighthouse-desktop.webp)

<h2 id="lighthouse-mobile">Mobile</h2>

![Mobile results](documentation/testing/lighthouse-mobile.webp)

<h1 id="bugs">Bugs / Issues</h1>

The following bugs where found and fixed during the development process no further bugs have been discovered to date.

BUG: When a user navigates to a new page the page scroll depth stays the same user is not scrolled to the top of the new page
<br />
<a href="https://github.com/artcuddy/project5-foodsnap-frontend/issues/16">Github Issue #16</a>

-  Found a solution here https://v5.reactrouter.com/web/guides/scroll-restoration and implemented this tested and scroll to top on navigation works fine when going forward but also scroll to top on navigating backward

BUG: When a user navigates back to the previous page the page scrolls to the top with ScrollToTop enabled.
<br />
<a href="https://github.com/artcuddy/project5-foodsnap-frontend/issues/17">Github Issue #17</a>

-  Found a solution here https://www.kindacode.com/article/react-router-dom-scroll-to-top-on-route-change/ to stop the scroll to top happening on back navigation using POP

BUG: The post page refreshes 3 times when a user likes a post.
<br />
<a href="https://github.com/artcuddy/project5-foodsnap-frontend/issues/18">Github Issue #18</a>

-  I had accidentally added an alert to a useEffect statement which caused the page to refresh on post like, removed this to sort the issue





