function takeWords ( allAddress ) {
    var subAddress = "";
    for (var i = 0; i < 9; i++) {
        subAddress += allAddress[i]; 
    }
    return subAddress;
}
export function openMaps (allAddress, researchName) {
    var subAddress = takeWords(allAddress);
    window.open(`http://maps.apple.com/maps?q=${subAddress+researchName}`);
}