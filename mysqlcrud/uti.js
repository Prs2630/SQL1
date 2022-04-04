function generate(){
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.
    });
}