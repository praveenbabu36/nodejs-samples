const { builtinModules } = require("module");

module.exports.replaceTemplate = (temp, prdEl) => {
    
    //function to replace placeholders

    let output = temp.replace(/{%PRODUCT_NAME%}/g, prdEl.productName);
    output = output.replace(/{%PRODUCT_IMAGe%}/g, prdEl.image,);
    output = output.replace(/{%PRODUCT_FROM%}/g, prdEl.from);
    output = output.replace(/{%PRODUCT_IMAGe%}/g, prdEl.image);
    output = output.replace(/{%PRODUCT_QTY%}/g, prdEl.quantity);
    output = output.replace(/{%PRODUCT_PRICE%}/g, prdEl.price);
    output = output.replace(/{%PRODUCT_NUTRIENTS%}/g, prdEl.nutrients);
    output = output.replace(/{%PRODUCT_ID%}/g, prdEl.id);
    output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, prdEl.description);

    if(!prdEl.organic) {
        // not-organic is a css class which hides the div in template
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    //console.log('Output --> : ', output);
    return output;
}