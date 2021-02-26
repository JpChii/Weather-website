//client side code

console.log('client side java script loaded!!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherform = document.querySelector('form')
//finding the element by input
const search = document.querySelector('input')
const messageone = document.querySelector('#message1')
const messagetwo = document.querySelector('#message2')

weatherform.addEventListener('submit', (e) => {
    //prevent's page from refreshing
    e.preventDefault()
    const location = search.value
    console.log(location)

    messageone.textContent = 'loading...'
    messagetwo.textContent = ''

    //we are using the api we developed
fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
            messageone.textContent = data.error
        }else{
            console.log(data.forecast)
            console.log(data.location)
            messageone.textContent = data.location
            messagetwo.textContent = data.forecast
        }
        
    })
})
})