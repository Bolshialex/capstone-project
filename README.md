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
