export default core = {
    cipher: (objData, strKey, onSucceed = e => console.log(e), onFail = e => console.error(e)) => {

        // BINARY16 - Convert between String and Binary16
        const BINARY16 = (obj) => {
            if (obj.constructor.name === 'Array') {
                return obj.map(char => String.fromCharCode(parseInt(char, 2))).join('')
            } else {
                var strPadding = '0000000000000000'
                return obj.split('').map(char => {
                    var strBinary = char.charCodeAt(0).toString(2)
                    return strPadding.slice(strBinary.length) + strBinary
                })
            }
        }

        // PROLIFERATE - Create A Second Level Key
        const PROLIFERATE = (strKey, strCatalyst = 'GreaterLordRukkhadevata', arrCatalyst = [11, 45, 14]) => {
            const strKeyReverse = strKey.split('').reverse().join('')
            return strKey.split('').map((v, i) => {
                if (i % 2 === 0) return strKey.substring(Math.ceil(i / 2), i) + String.fromCharCode((v.charCodeAt(0) + arrCatalyst[i % 3] - 33) % 96 + 33) + strCatalyst[i % 23]
                else return strKeyReverse.substring(Math.ceil(i / 3), i) + strCatalyst[i % 23] + String.fromCharCode((v.charCodeAt(0) + arrCatalyst[i % 3] - 33) % 96 + 33)
            }).join('')
        }

        // RESPONSE - Returned Class
        const RESPONSE = (code, data) => {
            return {
                code: code,
                data: data
            }
        }

        // XOR - Perform Exclusive or
        const XOR = (strA, strB) => {
            var strAns = ''
            if (strA.length === strB.length) {
                for (let i = 0; i < strA.length; i++) {
                    if (strA[i] === strB[i]) strAns = strAns + '0'
                    else strAns = strAns + '1'
                }
                return strAns
            }
            return strA
        }

        // Process Start
        try {

            // Initialize Cipher Key
            const arrKey = BINARY16(strKey)
            const arrKeyPro = BINARY16(PROLIFERATE(strKey))
            const intKeyLength = arrKey.length
            const intKeyProLength = arrKeyPro.length

            // Decrypt Data
            if (objData.constructor.name === 'String') {
                var arrData = BINARY16(objData)
                var strTemp = BINARY16(arrData.map((char, i) => XOR(char, arrKey[i % intKeyLength])))
                var arrTemp = BINARY16(strTemp)
                strResult = BINARY16(arrTemp.map((char, i) => XOR(char, arrKeyPro[i % intKeyProLength])))
                const resp = RESPONSE(200, JSON.parse(strResult))
                onSucceed(resp)
                return resp

                // Encrypt Data
            } else {
                var arrData = BINARY16(JSON.stringify(objData))
                var strTemp = BINARY16(arrData.map((char, i) => XOR(char, arrKeyPro[i % intKeyProLength])))
                var arrTemp = BINARY16(strTemp)
                strResult = BINARY16(arrTemp.map((char, i) => XOR(char, arrKey[i % intKeyLength])))
                const resp = RESPONSE(200, strResult)
                onSucceed(resp)
                return resp
            }

            // Process Fail
        } catch (error) {
            const resp = RESPONSE(500, error)
            onFail(resp)
            return resp
        }
    }
}
