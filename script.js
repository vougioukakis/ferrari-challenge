let activeIndex = 0;
const items = document.querySelectorAll('.carousel-element');
const totalItems = items.length;
const classesToCheck = ['active', 'next', 'prev', 'out-next', 'out-prev']; //used to add hidden class
const names = document.querySelectorAll('.name');
console.log(names);
/**
 * throttling to handle scrolling
 */
function throttle(func, delay) {
    let inThrottle = false;
    return function() {
        if(!inThrottle){
            func.apply(this,arguments);
            inThrottle = true;

            setTimeout(function(){
                inThrottle = false;
            }, delay);
        }
    };
}

document.addEventListener('wheel', throttle((event) => {
    if (event.deltaY < -5) {
        cycle('prev');
        console.log('up');
    } else if (event.deltaY > 5) {
        cycle('next');
        console.log('down');
    }
}, 800));

/**
 * modulo arithmetic to make the index positive
 */
function normalize(ind){
    return ((ind % totalItems) + totalItems)%totalItems;
}

/**
 * cycle classes depending on scroll up or down
 */
function cycle(arg){
    if (arg == 'next'){

        items[normalize(activeIndex)].classList.remove('active')
        items[normalize(activeIndex)].classList.add('prev');
        
        items[normalize(activeIndex+1)].classList.remove('next');
        items[normalize(activeIndex+1)].classList.add('active');

        items[normalize(activeIndex-1)].classList.remove('prev');
        items[normalize(activeIndex-1)].classList.add('out-prev');

        items[normalize(activeIndex+2)].classList.remove('out-next');
        items[normalize(activeIndex+2)].classList.add('next');

        items[normalize(activeIndex-2)].classList.remove('out-prev');
        items[normalize(activeIndex-2)].classList.add('hidden');

        items[normalize(activeIndex+3)].classList.remove('hidden');
        items[normalize(activeIndex+3)].classList.add('out-next');

        hideElements();

        names[normalize(activeIndex)].className = '';
        names[normalize(activeIndex)].classList.add('name','name-prev');

        names[normalize(activeIndex+1)].className = '';
        names[normalize(activeIndex+1)].classList.add('name','name-active');

        names[normalize(activeIndex+2)].className = '';
        names[normalize(activeIndex+2)].classList.add('name','name-next');

        activeIndex++;

    } else {

        items[normalize(activeIndex)].classList.remove('active')
        items[normalize(activeIndex)].classList.add('next');
        
        items[normalize(activeIndex+1)].classList.remove('next');
        items[normalize(activeIndex+1)].classList.add('out-next');

        items[normalize(activeIndex-1)].classList.remove('prev');
        items[normalize(activeIndex-1)].classList.add('active');

        items[normalize(activeIndex+2)].classList.remove('out-next');
        items[normalize(activeIndex+2)].classList.add('hidden');

        items[normalize(activeIndex-2)].classList.remove('out-prev');
        items[normalize(activeIndex-2)].classList.add('prev');

        items[normalize(activeIndex-3)].classList.remove('hidden');
        items[normalize(activeIndex-3)].classList.add('out-prev');

        hideElements();

        names[normalize(activeIndex-2)].className = '';
        names[normalize(activeIndex-2)].classList.add('name','name-next');

        names[normalize(activeIndex)].className = '';
        names[normalize(activeIndex)].classList.add('name','name-next');

        names[normalize(activeIndex-1)].className = '';
        names[normalize(activeIndex-1)].classList.add('name','name-active');
        activeIndex--;

    }
}

/**
 * check which elements to assign hidden class to
 */
function hideElements(){
    items.forEach(item => {
        const shouldHide = !classesToCheck.some(cls => item.classList.contains(cls));
        
        if (shouldHide) {
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
        }
    });
}