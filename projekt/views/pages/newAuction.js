<!-- views/pages/login.ejs -->

<!DOCTYPE html>
<html>
    <head>
        <% include ../partials/head %>
        <!-- Custom styles for this template -->
        <link href="/css/signin.css" rel="stylesheet">
    </head>
    <body>
        <header>
            <% include ../partials/header %>
            <% include ../partials/message %>
        </header>
        <main role="main" class="container">
                <form class="form-signin" action='/signup' method='POST'>
                        <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
                        <input type="text" name="username" class="form-control" placeholder="Username" required autofocus>
                        <input type="password" name="password" class="form-control" placeholder="Password" required>
                        <input type="email" name="email" class="form-control" placeholder="Email address" required>
                        <input type="text" name="firstName" class="form-control" placeholder="First name" required>
                        <input type="text" name="lastName" class="form-control" placeholder="Last name" required>
                        <p></p>
                        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
                </form>
                
                
        </main>
        <footer>
            <% include ../partials/footer %>
        </footer>
    </body>
</html>