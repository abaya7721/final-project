# Web App Project

## Technical Requirements
Unless it's modified by a stretch goal (see below), the following are strict technical
requirements.
1. Manage 4-7 database tables (entities) that are independent concepts. A simple
   bridge table doesn't count.
2. MySQL for data management
3. Spring Boot, MVC, JDBC, Testing, and Security
4. An HTML and CSS UI that's built with React
5. At least one async JavaScript HTTP request
6. Sensible layering and pattern choices
7. At least one UI secured by role
8. A full test suite that covers the domain and data layers


## Planning 

### App Idea 1
#### WRC Rally Historical Data Viewer + Events for Current Year

The WRC Rally Historical Data Viewer is an intuitive web application that provides historical summaries and statistics for World Rally Championship (WRC) races from the 2015 to 2025.
This application allows motorsport enthusiasts to explore past race results, driver statistics, team performances, and overall standings. Users will interact through a responsive web page built with Spring Boot, React, and MySql.

#### Scope 

##### Objectives
- Create a web based user interface
- Allow user to view and interact with historical data
- Provide administrator access - extra UI features and privileges

##### Must Have
- Authentication for account usage type
- Selection of specific races by location and year
- Display race information (standings, finish time, vehicle, team name, driver, co-driver)
- Responsive design for multiple devices

##### Could Have
- Display images for the race map and winner vehicle
- Interactive timeline for visual representation of WRC history with key milestones
- Data visualization using charts and graphs for comparing performances
- Advanced sorting and filtering to view results by year, event, driver, team, or car

#### Technology Stack
##### Backend

- Java: Core business logic and data processing
- Spring Boot: Production ready configuration files
- MySQL: Relational database for storing app data (rally data, users data)
- Node.js: API server requests

##### Frontend
- React.js: Component library for modern app design

### Admin User Story

#### 1. Landing Page and Authentication
- When the user goes to application landing page they will see the following:
- The web app name (WRC Historical Data Viewer) and possible logo
- Login options
- Navigation menu
- Sample visualizations that showcase the type of data available
- A section showing "Premium Features" benefits of premium access

#### 2. Authentication Process
- Log in prompt for username and password
- The system validates account

#### 3. Dashboard View and Site Access
- After successful login, the main admin dashboard page appears
- The dashboard displays a welcome message with username
- User can see a comprehensive navigation menu with the ability to edit data

#### 4. Complete Data Access
- Admin has unrestricted access to rally data
- Can manipulate data across the entire available data

#### 5. Possible Advanced Features
- User can create and save custom data filters and views
- User can create side-by-side comparisons between different years, drivers, or teams
- My preferences and recent activities are saved between sessions
- Export data as PDF or CSV



#### Project Roadmap
|   | Date   | Day       | Activities               |
|---|--------|-----------|--------------------------|
| x | 3-10   | Monday    | Planning Day            |
| 17 | 3-11   | Tuesday   | React All Day           |
| 16 | 3-12   | Wednesday | React Half Day, Design  |
| 15 | 3-13   | Thursday  | React All Day           |
| 14 | 3-14   | Friday    | React Half Day, Design  |
| 13 | 3-15   | Saturday  | Project Design          |
| 12 | 3-16   | Sunday    | Project Design          |
| 11 | 3-17   | Monday    | Python All Day          |
| 10 | 3-18   | Tuesday   | Python All Day          |
| 9 | 3-19   | Wednesday | Python All Day          |
| 8 | 3-20   | Thursday  | Project                 |
| 7 | 3-21   | Friday    | Project, Cloud          |
| 6 | 3-22   | Saturday  | Project                 |
| 5 | 3-23   | Sunday    | Project                 |
| 4 | 3-24   | Monday    | Project, Cloud          |
| 3 | 3-25   | Tuesday   | Project                 |
| 2 | 3-26   | Wednesday | Project, Cloud          |
| 1 | 3-27   | Thursday  | Project                 |
|   | 3-28   | Friday    | Presentation Day        |


