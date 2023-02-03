import { menuArray } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


const cardDetailsForm = document.getElementById('card-details-form')


cardDetailsForm.addEventListener('submit',function(e){
    e.preventDefault()
    renderOrder("finished")
    menuArray.forEach(function(item){

        item.quantity = 0 
 } )  
})

document.addEventListener('click', function(e){

    console.log(e.target.classList)
 
    if(e.target.dataset.addedItem){
        
        handleAddItem(e.target.dataset.addedItem)          

     }

     else if(e.target.dataset.removedItem){
        handleRemoveItem(e.target.dataset.removedItem)
     }

     else if(e.target.id==="complete_order_btn"){
        document.getElementById("modal").classList.remove("hidden")
     }

     else if(e.target.classList.value==="item"){
        document.getElementById("modal").classList.add("hidden")
     }


     
})


function renderOrder(item_id){


    if(item_id=="finished"){

        const order = document.getElementById(`order`) 
        let orderHtml = `
        
        		<div class="confirm-message">
                    <p class="confirm-text">Thanks, James! Your order is on its way!</p>
                 </div>	 
        
        `
        order.innerHTML = orderHtml   
        document.getElementById(`modal`).classList.add('hidden') 
        return
    }

    let items = 0

    menuArray.forEach(function(item){

           items+=item.quantity 
    } )  

    if (items){

        const order = document.getElementById(`order`) 
        let orderHtml = `
        
                <p class="order_text order_header">Your order</p>
        
        `
        let total=0
    
        menuArray.forEach(function(item){  
    
             if(item.quantity>0){
                total += item.price *item.quantity
                orderHtml += `
                    <div class="order_item">
                        <p class="order_text"> ${item.quantity} ${item.name}</p>  
                        <button class="remove_btn" data-removed-item=${item.id}>remove</button>  
                        <p class="price_text item_price">$${item.price *item.quantity}</p>                    
                    </div>          
                `
             }
    
        })
    
    
        orderHtml += `
        <div class="total_price">
            <p class="order_text">Total price: </p>
            <p class="price_text item_price">$${total}</p>
        </div>
        <button class="complete_order_btn" id="complete_order_btn">Complete order</button>  
    
     `
    
        order.innerHTML = orderHtml
        document.getElementById(`order`).classList.remove('hidden')
    
    }
    else{
        document.getElementById(`order`).classList.add('hidden')
    }

 

}


function handleAddItem(item_id){

    menuArray.forEach(function(item){
        if(item_id==item.id){
           item.quantity++           
           
        }})  
    
    renderOrder()

}


function handleRemoveItem(item_id){

    menuArray.forEach(function(item){
        if(item_id==item.id){
           item.quantity--           
           
        }})  
    renderOrder()

}



function getFeedHtml(){
    let feedHtml = ``
    menuArray.forEach(function(item){

        let ingredients = ``
        item.ingredients.forEach(function(ingredient, index){
            if (index === item.ingredients.length-1){
                ingredients+= `${ingredient} `
            }
            else{
                ingredients+= `${ingredient}, `
            }
            
        })

        feedHtml += `
        
        <div class="menu">
            <div class="item">
                <p class="food-emoji">${item.emoji}</p>
                <div>
                    <p class="general_text">${item.name}</p>
                    <p class="ingredients_text">${ingredients}</p>
                    <p class="price_text">$${item.price}</p>                    
                </div>
                <button class="add_item" data-added-item=${item.id}>+</button>
            </div>
        </div>

        `

    })

    return feedHtml


}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()    
    
}

render()
