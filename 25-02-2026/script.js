
    document.getElementById("btn").addEventListener("click", function() {
      
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const phn = document.getElementById("phn").value;
      const email = document.getElementById("email").value;
      const fileInput = document.getElementById("fl");
      const resume = fileInput.files.length > 0 ? fileInput.files[0].name : "";

     
      const csv = [
        ["Name","Age","Phone","Email","Resume"],
        [name, age, phn, email, resume]
      ]
     
    });
