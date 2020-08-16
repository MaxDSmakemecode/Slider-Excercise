document.addEventListener('DOMContentLoaded', function(){
    /* 
    +++ slider animation +++
    1. save the slide classes to a variable
    2. set a counter and write the value as zero (important: the counter always has to be outside of a function so after the function execution is over the current value is not set back to 0 once the function repeats itself in the animation)
    3. we need two animations: one for the animation of a single slide to fire and one for the whole slider so after a single slide another slide follows and so on
    4. the counter is needed to limit the slider when a certain length is reached and to mark the active slide, because the active slide element needs to have different styles to be active f.e. a 'display: block' instead of 'none'
    5. loop through the slides to set every slide to 'display: none' when once a single slide is finished loading
    6. increment the counter and limit the counter for a certain length
    7. use two animations with both of them having the slider function as one argument and one as the interval (placement of these animations is key)
    X. finally set a interval and place it as a variable at the beginning of the code, so it can be easily changed by someone who doesn't understand the code

    +++ slider controls +++
    already added after trial and error

    +++ restart single slide animation when element is 'next' or 'prev' is clicked +++
    1. if one of the control buttons is clicked, stop the animation completely and execute the single slide function
    2. condition: slider animation has to remain automatic


    ################ TO DOS #################
    1. setInterval + clearInterval 
    2. slider start pause option for autoplay
    3. if not autoplay just have left / right

    REACT-Slider  ULTRA-SIMPLE only left right (no autoplay)
    #########################################
    */

    const slideInterval = 2000
    const slides = document.querySelectorAll('.slide')
    const prev = document.querySelector('.prev')
    const next = document.querySelector('.next')
    let counter = 0
    let timeOut;

    function removeAllSlides(){
        slides.forEach(slide => {
            slide.classList.remove('slide-animation')
        })
    }

    next.addEventListener('click', function(){
        let slideAnimationVariable = setTimeout(slideAnimation, slideInterval)
        clearTimeout(slideAnimationVariable)
            if(counter >= slides.length){
                removeAllSlides()
                counter = 0
                slides[counter].classList.add('slide-animation')
                console.log(counter, 'next click case 1')
            }
            else{
                counter++
                removeAllSlides()
                slides[counter - 1].classList.add('slide-animation')
                console.log(counter, 'next click case 2')
            }
        })

    prev.addEventListener('click', function(){
        let slideAnimationVariable = setTimeout(slideAnimation, slideInterval)
        clearTimeout(slideAnimationVariable)
            if(counter === 0){
                removeAllSlides()
                counter = slides.length
                slides[counter - 1].classList.add('slide-animation')
                console.log(counter, 'prev click case 1')
            }
            else{
                counter--
                removeAllSlides()
                slides[counter].classList.add('slide-animation')
                console.log(counter, 'prev click case 2')
            }
        })

    function slideAnimation(){
        for(let i = 0; i < slides.length; i++){
            slides[i].classList.remove('slide-animation')
        }
        if(counter >= slides.length){
            counter = 0
        }
        else if(counter < 0){
            counter = slides.length
        }
        counter++

        slides[counter - 1].classList.add('slide-animation')

        // single slide animation
        setTimeout(slideAnimation, slideInterval, console.log(counter))
    }

    // start animation
    setTimeout(slideAnimation, 0, console.log('slide start'))
})