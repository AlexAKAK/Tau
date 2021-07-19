
class a {
    sus = 1;
}

const obj = new a()

console.log(`before function ${obj.sus}`)

function test(obj) {
    obj.sus = 0
    console.log(`inside function ${obj.sus}`)
}

test(obj)

console.log(`after function ${obj.sus}`)