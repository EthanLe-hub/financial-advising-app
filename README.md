To create a new React project (using Windows PowerShell on Windows):

    npm create vite@4.1.0 (or @latest react-app)
    
    OK to proceed? y
    
    Project name: (enter project name: react-app)
    
    Select a framework: React
    
    Select a variant: TypeScript 


After scaffolding project (using Windows PowerShell on Windows):

    cd (name of project: react-app) 
    
    npm install (or npm i)


To run the React project (using Windows PowerShell in Visual Studio Code):

    cd (name of project: react-app)
    
    npm run dev 


To open Visual Studio Code and scroll to React project (using Windows PowerShell on Windows -- new tab):

    code .


Extensions to install: 

    Prettier - Code Format (by Prettier Legacy) -- Files -> Preferences -> Settings -> "format on save" -> enable Format On Save
    
    Simple React Snippets (by Burke Holland)
    
    ES7+ React/Redux/React-Native snippets (by dsznajder)

How to construct URL for fetching API (from API documentations like Finnhub):
    Base URL: https://finnhub.io/api/v1
    Endpoint Path: GET /quote
    Query Parameters: symbol = AAPL,  token = YOUR_API_KEY  -->  ?symbol=AAPL&token=YOUR_API_KEY
    Final URL: https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_API_KEY
