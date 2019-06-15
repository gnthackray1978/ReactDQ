
export function GNGraph(generationsArray) {


    this.Generations = generationsArray;

}

GNGraph.prototype = {


    FatherEdge: function(genIdx, personIdx){

        var currentPerson = this.Generations[genIdx][personIdx];
        var fatherNodeLink;


        if(genIdx > 0 && currentPerson) {
            fatherNodeLink = this.Generations[genIdx - 1][currentPerson.FatherIdx].nodeLink;
        }

        if(!fatherNodeLink)
            console.log('father node link not found');

        if(!currentPerson.nodeLink)
            console.log(currentPerson.PersonId + 'current node missing nodelink');

        if(genIdx <= 0)
            console.log('no father for generation: ' + genIdx);


        if(fatherNodeLink && currentPerson.nodeLink && genIdx > 0){
            return {IsValid: true, FatherNode : fatherNodeLink, ChildNode : currentPerson.nodeLink};
        }
        else
        {
            return {IsValid: false};
        }


    }
};
