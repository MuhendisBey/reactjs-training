numbers = [4,8,15,16,23,42]

numbers.filter(function(x){ return x%2 === 0; } )
    .map(function(u){ return u*u; })
    .reduce(function(acc,num){return acc+num;}, 0)

numbers.filter( x => x%2 === 0 )
    .map( u => u*u)
    .reduce( (acc,num) => acc+num , 0)
