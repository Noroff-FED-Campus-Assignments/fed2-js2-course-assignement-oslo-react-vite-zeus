[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/8ndPp79U)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12183992&assignment_repo_type=AssignmentRepo)

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/WzuOnFrK)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11650804&assignment_repo_type=AssignmentRepo)

## Resources

- [Brief](https://fed-vocational-astro-course.vercel.app/en/javascript-2/ca/ca)
- [Design](https://www.figma.com/file/yRXnqBF2sY3ZUJGe0RfsuS/Javascript-2-CA?type=design&node-id=0-1&mode=design&t=AuOfK2IbChmfJIUE-0)
- [Production deploy](https://main--teamzeusjs2.netlify.app/)
- [Deployment CI](_LINK_TO_NETLIFY_VERCEL_DASHBOARD_)

## Report FED2-Javascript 2 Course Assignment

### Intro

This document will serve as our FED2-Javascript 2 Course Assignment Rapport & Rationale, throughout the document we will detail our coding choices and the work process, as well as the design choices we went with.

Each team member will detail their work process for their respective component. This project was the second group project all of us went through during our time studying at Noroff, things went a lot smoother this time around, the work process with github was not so new and frightening.

We quickly settled on using the design we had for our last CA on this project as well.
We faced some difficulties on implementing the data from the API in our design because the Noroff Api is limited in what it provides.

### Login/Register page - Sander Selfors

My part of this assignment was creating an efficient and user-friendly registration and login system for our social media platform using JavaScript and React.

For the registration form, I incorporated a strict email validation process that specifically checked if the user's email belonged to the domains "@noroff.no" or "@stud.noroff.no". If the email didn't match these criteria, I made sure to display a helpful error message. Upon successful registration, users were greeted with a warm welcome message and automatically redirected to the login page.

Moving on to the login form, I ensured a smooth login experience by sending the user's credentials to the server for verification. If the login was successful, I stored the access token in the local storage for future use. Error handling was also a crucial part, and I made sure to display clear error messages to assist users in case of any issues.

Furthermore, I paid special attention to responsive design, making the forms adaptable to various screen sizes for enhanced user interaction. Working alongside my fellow student, Ali and Espen, greatly contributed to my learning journey, making this project a significant milestone in my mastery of JavaScript, React, and web development.

### Home page - Ali

I took the task of fetching posts and populate the so called home page, which includes a section of users profile, a section for writing posts and a section that gets all the posts with possibility to search. Here i will explain my challenges, short comings, issues and my possible solutions.

##### Creating posts:

The actual code for writing posts was not that challenging, it has a field for title, body and media. Although I understand a string of URL is expected by the endpoint and the media input will give it an actual file. This might be because a file is size consuming. An issue which I have discovered and is fairly obvious; when a post is submitted, it will not update the populated data shown under and one have refresh the website in order to see their post. This could be fixed by simply adding location.reload() after endpoint gives a successful feedback.

##### Editing posts:

My most challenging and time consuming contribution. Editing post was trickier than I thought. I needed input fields hidden when post is in normal state, and shown when "Edit" was pressed. That was easy enough. The tricky part was to send the ID of the post to be used in the function responsible to update post. Eventually I learned how to use Proptypes which was already provided by Monde, and luckily made progress. A presisting issue is one already mentioned above, post will not show the updated data immidiatly, the page need to be refreshed for the new data to show. After the status returns 200, the page should reloade. This of course can be done with deleting posts aswell.
If I had more time, I wanted the current posts title and body value to be already set inside the update fields, so user can actually see the current copy they are editing. If that made sense.

##### Search field and filter:

Idealy, we wanted to have the searchfield in the nav bar, but due to lack opf time we settled for having a search field in the main body. I could easily improve this by adding more conditions for my filter such as body.

##### Details page:

Making the the details page was fairly easy, yet I found the consept to be unnecessary for the API that we are using. You can already view everything the endpoint has to offer with exception to tags. And if you wanted to you could make a comment section drop below the post aswell. In any case I have a working code that fetches the details in its own page with respect to posts ID.

##### Conclution:

Although annoying at times, I genuinly enjoyed working on this project. It was great practice and one no doubt I will open later to see how I did things. Yet I think 1 week for this assignment was not enough, I would've liked to add more features that I did not have time to do. Such as writing and viewing comments. One frustrtating thing with Noroff API, is that it's not possible (as far as I know) to change password. I had to use the default email and password to get a access token. in any case, I enjoyed this project and I enjoyed working with my team, we had good communication throughout and I believe both Espen and Sander to be competent devs.

### Profile page – Espen Henriksen Snerten

First off, I completely misunderstood the assignment, evidently I did not read the CA thoroughly enough, I spent most of my time on this project trying to get a profile list to work, I was also unfortunately without an internet connection for a day and a half, so really the creds go to Sander and Ali on this one.

After I reread the CA my work truly began, I offered my help in debugging and quality of life improvements to the project, I wont list everything I did, because again the brunt of the work was done by my team members, I helped were necessary such as local storage and a nifty way to set a default profile image.

The design for this project was frustrating, the data from the API was lackluster and stunted the creative process for me at least, I still don't like tailwind, but it was more palatable for me this time around.

In conclusion, a fun project when I truly got around to help build it, my view for the project was broader initially and that reflects in the work, I had hoped to get more features implemented, and with time would have done so.

I'm sorry to see the end of this particular team, both Ali and Sander are good dev's who I have enjoyed working with.

## Authors

- Ali (@AliNough)
- Espen (@EspenSnerten)
- Sander (@sanderselfors)

### Fonts

https://fonts.google.com/specimen/Poppins
