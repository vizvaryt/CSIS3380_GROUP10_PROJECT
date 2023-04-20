import "../css/loginregisterform.css";


const Register = () => {
  return (
    <div>
      <form action="action_page.php">
        <div class="container">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <label for="email">Email</label>
            <input type="text" placeholder="Enter Email" name="email" id="email" required />

            <label for="name">Name</label>
            <input type="text" placeholder="Enter Name" name="name" id="name" />
      
            <label for="psw">Password</label>
            <input type="password" placeholder="Enter Password" name="psw" id="psw" required />
      
            <label for="psw-repeat">Confirm Password</label>
            <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required />
            
            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
            <div class="formbtn">
                <button type="submit" class="btn">Register</button>
                <button type="button" class="cancelbtn btn">Cancel</button>
            </div>
            <span class="psw">Already have an account? <a href="#">Sign in</a>.</span>
        </div>
      </form> 
    </div>
  );
};

export default Register;