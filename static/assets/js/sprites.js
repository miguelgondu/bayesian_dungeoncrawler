let spritesImgs = {"avatar": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAABGdBTUEAALGPC/xhBQAAABVQTFRFAAAA9LnLt3uO/vX4////8Zy386/Fxs/Z3wAAAAF0Uk5TAEDm2GYAAABxSURBVAjXhc+xEYAgDAVQChkBB3AEubO2+FpTmAEU7+8/ggSChY2/eiR3IXGuBFidBXgfA8gbVmbJ3Ro7eY6sHnbmOBLmeVp+nSObdU5Jn3lNZn/Uv0QtojtsktRegE28WVPtqkPbUx3EbtF66i69rx/w3SdQbXcxfAAAAABJRU5ErkJggg==", "avatarRight1": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAABGdBTUEAALGPC/xhBQAAABVQTFRFAAAA9LnLt3uO/vX4////8Zy386/Fxs/Z3wAAAAF0Uk5TAEDm2GYAAABxSURBVAjXhc/NDYAgDAXgHmAEHAATFzDx7OHh2YMdwEi6/wjSUrn6EpKPB+GHqAXYyQOMSYBIhdfSUvvCIXJPYg7N6yZwP3n+9div57SMM/PSHS+761Qz6xsKmyMDhaNbYyZzouHE/hftz6/vw6yd+gXK1SZ52QqZXAAAAABJRU5ErkJggg==", "avatarRight2": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAABGdBTUEAALGPC/xhBQAAABVQTFRFAAAA9LnLt3uO/vX4////8Zy386/Fxs/Z3wAAAAF0Uk5TAEDm2GYAAABxSURBVAjXhc8xDoAwCAVQBnsEPUBNvICJs8Ovs4McwGi4/xEERFb/0lfa0EKkAVaKALnpIHIjyqK534NN5BzE3annRRC+6vjrvG99NNmzTq/L4W/tZmb7Q2N3YaBxCVvc5O4p3XPMYvX9G4xLUg98eQDKbCZvzUhM0QAAAABJRU5ErkJggg==", "avatarLeft1": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAAMFBMVEUAAAD0ucu3e47+9fj////xnLfzr8UHBwcICAgJCQkKCgoLCwsMDAwNDQ0ODg4PDw8/59ftAAAAAXRSTlMAQObYZgAAAHNJREFUeJyFzj0OgCAMBtAOcAAHLoCJFzBxdijMDvYEkt7/CPYHcLQJyesHKQWQQjyhF+JsAjI37DFLNb+ovEhjDpX3gxndT15//b2XOTzmiPM2fNtfpIykOxS61NJgoditZYaY1L5npDQNGl8j92PWTP0CviUmeZmhTK8AAAAASUVORK5CYII=", "avatarLeft2": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAAMFBMVEUAAAD0ucu3e47+9fj////xnLfzr8UHBwcICAgJCQkKCgoLCwsMDAwNDQ0ODg4PDw8/59ftAAAAAXRSTlMAQObYZgAAAHJJREFUeJyFz7ERwCAIBVAKHSCFC5i7LJC71CnQOkWYIB77jxBANGV+9UBOEUCCeIIHcRYBmRt6myWtH1RepDCHyvvBjN1PXn/9zcs9PO4R5234trdIGUl3KHSppcBC0a0xQ0zqvmekNA3avsbHfNinzC+9HCZvxMe1wAAAAABJRU5ErkJggg==", "avatarUp1": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAABGdBTUEAALGPC/xhBQAAAA9QTFRFAAAA9LnL////8Zy386/FbqDqNQAAAAF0Uk5TAEDm2GYAAABdSURBVAjXjc7bDcAgCAVQoiPYAcy1A5gyQQ37zyTl0Z/+9CbGg2KQSAN0igBvUSCyEMeiWX5xityHmIsbac1vs7t/fNksG1X5+cOoMwoMTlvczRwPWjJ6wtOXJfcNTPIZq+PARe0AAAAASUVORK5CYII=", "avatarUp2": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAABGdBTUEAALGPC/xhBQAAAA9QTFRFAAAA9LnL////8Zy386/FbqDqNQAAAAF0Uk5TAEDm2GYAAABdSURBVAjXjc7bCcAgEETRRUtICghjCghMBZHtv6a4Dw3kKxeE4wqqyAg4JAPWpkC1I8c66nFwqt67uksY06PflnC7vi7+Fs2s9odGcRMICiN35bacm+l3Lsw1s9sfTCwZq/4kRn4AAAAASUVORK5CYII=", "key": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAABGdBTUEAALGPC/xhBQAAAA9QTFRFAAAA5LcB7b0A/8wAtZMKqmjYxAAAAAF0Uk5TAEDm2GYAAABYSURBVAjXjY/RDcAgCAX9cALTBUw6QR8DmHr7z1SLjfRTvi4HvEBK25Vpi9Hi3IPRReh6egOGLqW5tKGrByHJ7jnSB8ORJiMyXx6yCFz8LhMH2O8w9h96AODQEA6YN+olAAAAAElFTkSuQmCC", "floor": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAKElEQVQ4T2N08kj8z0BlwDhq6GiYUjdNjSap0WxK3RTFMJqkRnKSAgCuEyhISklk5QAAAABJRU5ErkJggg==", "wall": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAABGdBTUEAALGPC/xhBQAAAA9QTFRFAAAAobGxvMzNtMbHrMDBhpDazwAAAAF0Uk5TAEDm2GYAAABgSURBVAjXPczRCYBADIPhQ1zg0AFEXEDqACfX/WeyaRr79PET2pZTd7TL46Y900bzHjbze6OR08xmls51mTld+YEre1gZVg7/OV0ZVoaV+YeZf5ix6czvTrtca2xW140Pukwz0ooCwNYAAAAASUVORK5CYII=", "goal": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAABGdBTUEAALGPC/xhBQAAAA9QTFRFAAAA2K0B/uSBMzMz/8wA6HymjgAAAAF0Uk5TAEDm2GYAAAA+SURBVAjXY2BSggEGBhUXGFBggDNdHBhcBCEsRxE0NrIaNLazMYJtbGxCkK1srEKSXiUlFUx7iXAnC5zNAACrtjcpX8Ao5wAAAABJRU5ErkJggg==", "enemy": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAjklEQVQ4T2NkwAHiVr34j0sOJr4oTIIRmxoMQWIMQzcI3XAUQ8kxEJuraWsoJa5Edy3cpXQxdFGYBNgBcateYEQwLjlYhOF0KU0MJZRGsckTdClS4GPoxxYkIEVEG0qKi0cNBacm+iZ+UiJoYLPp4HUptPBAqUJAiRlb6YVNHLn0x1mdICtCNhibOHp1AgCfr3MWlgL/DwAAAABJRU5ErkJggg==", "enemyLeft": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAjklEQVQ4T2NkwAHiVr34j0sOJr4oTIIRmxoMQWIMQzcI3XAUQ8kxEJuraWsoJa5Edy3cpTQzdFGYBNjSuFUvMCIVnxxel9LEUELpkpA8LGlhDVOYi5ENwRYkuNIr7SOKkPcIyeP1PiHNuORHDQVH/GjsIxIIekkFSiLYSi9s4silP87qBFkRssHYxNGrEwBTvnMWfBGpiwAAAABJRU5ErkJggg==", "enemyRight": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAd0lEQVR4nGNkwAHiVr34j0sOBhaFSTBiE8cQJMYwQoYzUWogNn1MuBRSAuCGkutKbPpp61J8YFGYBMOiMAmi5WjiUhZiFMWtekGSHFGGwgC2IKDYUHwuRgYDF/ujho4aSoah2KoGXNUFIbVMuCRgbHQDsImjqwEAsDsrpT3r2kcAAAAASUVORK5CYII=", "enemyUp": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAZklEQVQ4T2NkwAHiVr34j0sOJr4oTIIRmxoMQWIMQzcI3XAUQ8kxEJuraWsoJa5Edy3cpaOGEkyXxKbb0TCFhNRokhpNUoTyDH55WGGNtzwFKcKW1LCJI5f+OKsTZEXIBmMTR69OAIyCZBakjoboAAAAAElFTkSuQmCC", "enemy2": "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVAgMAAADUeU0FAAAABGdBTUEAALGPC/xhBQAAAAxQTFRFAAAAX4wZiMYmgL4faUQe1gAAAAF0Uk5TAEDm2GYAAAA9SURBVAjXY2DABpj/////gYGBH0j9AVKrUan1YOo/hPr6/zoSBdXwP7Qemff/1x4k6t8uCLUfoQRqHwQAAJcoP97yVLBlAAAAAElFTkSuQmCC"};

let avatar = document.createElement("img");
avatar.src = `data:image/png;base64,${spritesImgs.avatar}`

let avatarRight1 = document.createElement("img");
avatarRight1.src = `data:image/png;base64,${spritesImgs.avatarRight1}`

let avatarRight2 = document.createElement("img");
avatarRight2.src = `data:image/png;base64,${spritesImgs.avatarRight2}`

let avatarLeft1 = document.createElement("img");
avatarLeft1.src = `data:image/png;base64,${spritesImgs.avatarLeft1}`

let avatarLeft2 = document.createElement("img");
avatarLeft2.src = `data:image/png;base64,${spritesImgs.avatarLeft2}`

let avatarUp1 = document.createElement("img");
avatarUp1.src = `data:image/png;base64,${spritesImgs.avatarUp1}`

let avatarUp2 = document.createElement("img");
avatarUp2.src = `data:image/png;base64,${spritesImgs.avatarUp2}`

let key = document.createElement("img");
key.src = `data:image/png;base64,${spritesImgs.key}`

let goal = document.createElement("img");
goal.src = `data:image/png;base64,${spritesImgs.goal}`

let floor = document.createElement("img");
floor.src = `data:image/png;base64,${spritesImgs.floor}`

let wall = document.createElement("img");
wall.src = `data:image/png;base64,${spritesImgs.wall}`

let enemy = document.createElement("img");
enemy.src = `data:image/png;base64,${spritesImgs.enemy}`

let enemyUp = document.createElement("img");
enemyUp.src = `data:image/png;base64,${spritesImgs.enemyUp}`

let enemyLeft = document.createElement("img");
enemyLeft.src = `data:image/png;base64,${spritesImgs.enemyLeft}`

let enemyRight = document.createElement("img");
enemyRight.src = `data:image/png;base64,${spritesImgs.enemyRight}`

let sprites = {
    "w": wall,
    ".": floor,
    "1": enemy,
    "1l": enemyLeft,
    "1r": enemyRight,
    "1u": enemyUp,
    "g": goal,
    "+": key,
    "A": avatar,
    "Ar1": avatarRight1,
    "Ar2": avatarRight2,
    "Al1": avatarLeft1,
    "Al2": avatarLeft2,
    "Au1": avatarUp1,
    "Au2": avatarUp2,
}

// export { sprites };
// console.log(sprites)
