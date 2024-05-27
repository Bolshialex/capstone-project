Kept # Documentation Update's

### 1. Week Two

  Date: April 27, 2024
  
  Features Added/Updated Since Last Update
  

    - Started using branches to implement the front end safely
    - Created a sign-up and login page using Bootstrap and react
    - Implemented encryption to register user passwords
    - Created most queries for available options (I still have a few missing. Waiting for the frontend features to have dynamic values from selected choices ex(updating displayed customer information))
       
  Issues Encountered
      
    - Kept getting an undefined value error for the data picked up from the request body when inserted into the customer table. 
        - Resolved after fixing method placement and syntax issues
    - Create meeting times are off by a couple of hours. I'm sure it's a timezone feature. 
        - Unresolved, need to dig deeper into the timezone features and make sure they are implemented correctly.

  Lessons Learned

    - Constantly looking at how I can clean my code up and simplify my features. (Considering not having a customer sign in as it is not necessary for a CRM) 
    - Stay up to date with this read me. Adding the features and issues as I move along the project. 
    - The importance of encryption and how it works. 
    - A database isn't always safe and SQL injections can happen. I Need to look into how to prevent easy access to all the data in the database


### 2. Week Four

  Date: May 12, 2024
  
  Features Added/Updated Since Last Update
  
    - Updated the MySQL database to only allow employees and admins to sign up and sign in. After some thought, I realized that there's no need for an employee to sign in as a CRM for a company to keep track of its customers.
    - Updated the SQL queries to avoid SQLInjections. I did this by passing the query and its values as parameters. This is so data isn't directly being placed into the SQL query and manipulated to cause damage to the database.
    - Added the main page with a side nav to dynamically show my tables and database info.
       
  Issues Encountered
  
    - No major issues that caused problems.
    - Minor issues included, getting to know react-router-dom and passing through data.

  Lessons Learned
  
    - From working on making a full-stack project for mid-terms. I was able to learn to implement using the react-router-dom to create paths and navigate through different pages.
    - I also had practice fetching data and creating the proper functions to handle those tasks.
    - Sometimes you have to delete everything and start over if it isn't too much work. I didn't like my react setup so I switched to vite/react. It's not that big of a change but it helps with performance and has other helpful tools.


### 3. Week Six

  Date: May 26, 2024
  
  Features Added/Updated Since Last Update
  
    - Added frontend functionality for some CRUD features. These include Create and Delete. These are available for employees and customers.
    - Added some code to allow a page reload without having to constantly log back into your account.
    - Updated my database for an updated delete functionality.
    
  Issues Encountered
  
    - On page reload the user would have to log back into the account. This is obviously annoying and an example of bad design.
      - Resolved, Added the authentication to the local storage so that it can be accessible on a page reload. 
    - When deleting an employee that was assigned to a customer SQL gave me a lot of problems because I would need to clear that relationship before deleting.
      - Resolved, I brought up the problem to a teacher and he mentioned that I can add an is_active variable and on delete, I would change that value.
        This helped with simplicity and he made a good point of not deleting data from a table just in case that data is needed further down the project.

  Lessons Learned
  
    - Test all areas a user might go to and click. Refresh is something the user will use from time to time and it's important to check for errors in that functionality.
    - Asking for help understanding a problem can go a long way and can help broaden your view on an issue or error you are dealing with.

