

(function (){
    /*===MODEL===*/
    let model = {
        init: function() {
            localStorage.pastes = JSON.stringify([])
        },
        arrayPastes: function() {
            return JSON.parse(localStorage.pastes)
        },
        addPaste: function(txt) {
            let data = this.arrayPastes();
            data.push(txt);
            localStorage.pastes = JSON.stringify(data)
        },
        deletePaste: function(){
            let data = this.arrayPastes();
            data.shift();
            localStorage.pastes = JSON.stringify(data)
        }
    };


    /*===OCTO===*/
    let octo = {
        init:function() {
            model.init();
            view.init();
            model.arrayPastes()
                  

                   
        },
        addTxt: function(txt){
            model.addPaste(txt)
            let arrayPastes = model.arrayPastes();
            if(arrayPastes.length > 5){
                model.deletePaste()
            }
            view.render();
            //console.log(arrayPastes)
        },
        pasteTxt: function() {

        },
        getPastes: function(){
            return model.arrayPastes()
        }
    }

    /*===VIEW===*/
    let view = {
        init: function(){
                document.addEventListener('mouseup', function() {
                    view.selectTxt()
             })
        },
        render: function() {
            let pasteDivs = document.querySelectorAll('.paste')
            let pasteContents = octo.getPastes();
            let i = 0;
            for(let pasteDiv of pasteDivs){
                pasteDiv.textContent = pasteContents[i];
                i++
            }
        },
        selectTxt: function() {
            let sel = window.getSelection();
            let txt = sel.anchorNode.textContent;
            let selectedTxt = '';
            if(sel.extentOffset < sel.anchorOffset){
                selectedTxt = txt.slice(sel.extentOffset, sel.anchorOffset);
            }else{
               selectedTxt = txt.slice(sel.anchorOffset, sel.extentOffset);
            }
            
            //console.log(sel.anchorOffset, sel.extentOffset)
            if(selectedTxt.length > 0){
                octo.addTxt(selectedTxt);
            }
            
        },
    }
    octo.init()
})()
