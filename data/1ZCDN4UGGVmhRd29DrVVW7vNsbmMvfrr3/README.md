# ZeroCDN

### Fastest content delivery on planet earth. Guaranteed.

## Quick Usage Example

```
const _loadLib = async function(_location) {
    /* Initialize ZeroCDN public key. */
    const zerocdn = '1ZCDN4UGGVmhRd29DrVVW7vNsbmMvfrr3'

    /* Retrieve the library data (using ZeroApi). */
    const libData = await ZeroApi.cmd('fileGet', [`cors-${zerocdn}/libs/${_location}`])

    /* Evaluate (execute) JS library data (in global scope). */
    eval(libData) // FIXME Is there possibly anything "safer" than eval??
}

const init = async function () {
    await _loadLib('moment/2.22.2/js/moment.min.js')
    await _loadLib('numeral/2.0.6/js/numeral.min.js')

    /* Test injected libraries. */
    const epoch = moment().unix()
    const formatted = numeral(epoch).format('0,0')
    console.log(`Epoch is [ ${epoch} / ${formatted} ]`)
}

init()
```
