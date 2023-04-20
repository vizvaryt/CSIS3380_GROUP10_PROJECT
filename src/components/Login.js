import "../css/loginregisterform.css";


const Login = () => {
  return (
    <div>
      <form action="action_page.php" method="post">
        <div class="container">
            <h1>Login Here</h1>
            <label for="uname">Username</label>
            <input type="text" placeholder="Enter Username" name="uname" required />
      
            <label for="psw">Password</label>
            <input type="password" placeholder="Enter Password" name="psw" required />

            <div class="formbtn">
                <button type="submit" class="btn">Login</button>
                <button type="button" class="cancelbtn btn">Cancel</button>
            </div>
            <span class="register"> Didn't have account? <a href="#">Register Here</a></span>
        </div>
    </form>
    </div>
  );
};

export default Login;