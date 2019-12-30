const dessertsDiv = document.getElementById("desserts")

function gobottom ()
{ document.getElementById("show").scrollIntoView()
}

fetch("https://dessert-bae-api.herokuapp.com/desserts")
.then(res => res.json())
.then(desserts => {
    desserts.forEach(dessert => {
      dessertsDiv.innerHTML +=`
        <div class="w3-quarter" style="height: 400px">
          <img src="${dessert.image}" width="200" height="200">
          <h3 width="10" height="10">${dessert.name}</h3>
          <button onclick="gobottom()" data-id=${dessert.id} id="review-button">See Reviews 😋</button>
        </div>`
        
    });
})


// Individual Dessert Show page
let showDiv = document.getElementById("show")
dessertsDiv.addEventListener("click", evt => {
  if (evt.target.id === "review-button") {
  let id = evt.target.dataset.id
  fetch(`https://dessert-bae-api.herokuapp.com/desserts/${id}`)
  .then(res => res.json())
  .then(dessert => {
    showDiv.innerHTML = 
    `<h2 style="text-align:center">${dessert.name}</h2>
    <img src="${dessert.image}"  align="middle" width="700" height="600">
    <ul id="info">
      <li>Calories: ${dessert.calories}</li>
      <li>Price: ${dessert.price}</li>
    </ul>
     <h2> Customer Reviews 📝 </h2>
    
    `
    dessert.reviews.forEach(review => {
      showDiv.innerHTML += `<ul id="reviews"> <li id="review-item" data-id="${dessert.id}" data-id="${review.id}"> ${review.content} - <i>${review.name}, ${review.location} </i></li>`
    })
    
    showDiv.innerHTML += `
    <br>
    <br>
    </ul></p>
    <div class="container" id="form-container">
      <form data-id="${dessert.id}" id="new-review"><h3>Tell us how you feel! 💭 </h3>
          <div class="form-group">
            <textarea class="form-control" name="review" id="review-content" rows="3" cols="50"></textarea>
          <div class="form-group">
            <label for="name">Name 📛</label>
            <input type="text" class="form-control" name="name">
          </div><br>
          <div class="form-group">
            <label for="location">Location📍</label>
            <input type="text" class="form-control" name="location">
          </div><br>
        <button type="submit" id="post-button">Post! 💌</button>
        </div>
        </form>
    </div>
    `
    
            // Create Review
    let form = document.querySelector("#form-container")
    let reviewForm = document.getElementById("new-review")
            form.addEventListener("submit", (evt) => {
              evt.preventDefault()
              if (evt.target.id === "new-review"){
                let id = evt.target.dataset.id
                let newReview = evt.target.review.value
                let newName = evt.target.name.value
                let newLocation = evt.target.location.value
                reviewForm.reset()

                fetch(`https://dessert-bae-api.herokuapp.com/reviews`, {
                  method: 'POST', 
                  headers: {"Content-type": "application/json",
                  "Accept": "application/json"},
                  body: JSON.stringify({
                    content: newReview,
                    name: newName,
                    location: newLocation,
                    dessert_id: id
                  })
                })
                .then(res => res.json())
                .then(review => {
                  if (review.errors) {
                    alert("Fields cannot be blank")
                  } else {
                    let reviewPlace = document.getElementById("reviews")
                    reviewPlace.innerHTML +=`<li id="review-item" data-id="${dessert.id}" data-id="${review.id}"> ${review.content} - <i>${review.name}, ${review.location} </i></li>
                     <button data-id="${review.id}" id="update">Edit my review 🖊</button> <button data-id="${review.id}" id="delete">Delete 🚫</button>` 


                      // Update Review-Make Edit form

    
                 reviewPlace.addEventListener("click", evt => {
                  if (evt.target.id === "delete"){
                         fetch(`https://dessert-bae-api.herokuapp.com/reviews/${review.id}`,{
                           method: "DELETE"
                         })
                        evt.target.previousElementSibling.previousElementSibling.remove()
                        evt.target.previousElementSibling.remove()
                        evt.target.remove()       
                       }
          
                  if (evt.target.id === "update") {
                    const editForm = document.createElement("form")
                    editForm.id = 'edit-form'
                    editForm.innerHTML = `
                    <input name="review" value="${review.content}" />
                    <input name="name" value="${review.name}" />
                    <input name="location" value="${review.location}" />
                    <input id="update-button" type="submit" value="Update my review ⚡️">`
                  
                    editForm.addEventListener("submit", evt => {
                      evt.preventDefault()
                      updatedReview = evt.target.review.value
                      updatedName = evt.target.name.value
                      updatedLocation = evt.target.location.value

                      fetch(`https://dessert-bae-api.herokuapp.com/reviews/${review.id}`, {
                      method: 'PATCH', 
                  headers: {"Content-type": "application/json",
                  "Accept": "application/json"},
                  body: JSON.stringify({
                    content: updatedReview,
                    name: updatedName,
                    location: updatedLocation,
                    dessert_id: id
                  })
                  })
                  .then(res => res.json())
                  .then(updatedReview => {
                    let oldReview = editForm.previousElementSibling.previousElementSibling.previousElementSibling
                    oldReview.innerText = `${updatedReview.content} - ${updatedReview.name}, ${updatedReview.location}`  
                  })
                    })
                    reviewPlace.append(editForm)
                    

                  }
                  
                  
                 })
                  }
                  
                })
                

                 

     }
  })   
})
}

})


  

   
  

        
            


              
              
            

            

                                     
//   let reviewForm = document.getElementById("new-review")
// console.log(reviewForm)
  
//   reviewForm.addEventListener("submit", evt =>{
      
//       if (evt.target.id === "new-review"){
//           let id = evt.target.dataset.id
//     let newReview = evt.target.review.value
//     let newName = evt.target.name.value
//     let newLocation = evt.target.location.value
//     fetch(`http://localhost:3000/reviews`, {
  //   method: 'POST', 
  //   headers: {"Content-type": "application/json",
  //   "Accept": "application/json"},
  //   body: JSON.stringify({
  //     content: newReview,
  //     name: newName,
  //     location: newLocation,
  //     dessert_id: id
  //   })
  // })
  // .then(res => res.json())
  // .then(review => {
  //   reviewPlace.innerHTML += `<li>${review.content} - <i>${review.name}, ${review.location} </i></li>` 
  // ${dessert.reviews.map(review => review.content)} ${dessert.reviews.map(review => review.name)}, ${dessert.reviews.map(review => review.location)}

  // })
  // }
  // 





    
  


 

  



    
    
    
    
    
    
    
    
      
    
  
