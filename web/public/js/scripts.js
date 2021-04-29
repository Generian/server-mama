const checkPassword = (element) => {
  if(event.key === 'Enter') {
    try {
      const pw = element.value
      const data = {
        password: pw
      }
  
      fetch(`/api/password/kuchen`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        if (data.correct_pw) {
          window.location.href = data.link
        } else {
          console.log("wrong password")
          console.log(data)
        }
      })
      .catch(err => console.error(err))
    } catch {
      console.error("Failed to request password validation")
    }     
  }
}