var collection = 'QmVhKfvvhrSFYSV3AtJyMzpCatMuqpsEFgVwfpsQ8fAU1E';
var loadvideo = 'QmVGRFzNZfgkUzxh8LjegwkPXPm7Q7u7MoYhpk7T7vAjYY';

function videolookup(hash) {

    console.log('Looking up video with hash: ' + hash);

    switch (hash) {
        case 'QmVGRFzNZfgkUzxh8LjegwkPXPm7Q7u7MoYhpk7T7vAjYY':
            var videoinfo = [
                "Usagi Drop - Ep01", //title
                "QmVGRFzNZfgkUzxh8LjegwkPXPm7Q7u7MoYhpk7T7vAjYY", //video ipfs hash
                "QmXW1RM2KmbPApERhFsrUtricZ5Mx3pepbHrnXkA7EC5Xr", //poster ipfs hash
                "",
                "", //previous video hash (if nothing don't show button)
                "QmdDvsF4pBRxnakALiEdiVUvDHgGiZjmCaj5WGjcN2JxGX" //next video hash (if nothing don't show button)
            ];
            break;
        case 'QmdDvsF4pBRxnakALiEdiVUvDHgGiZjmCaj5WGjcN2JxGX':
            var videoinfo = [
                "Usagi Drop - Ep02", //title
                "QmdDvsF4pBRxnakALiEdiVUvDHgGiZjmCaj5WGjcN2JxGX", //video ipfs hash
                "QmWjBQYumX7NvUf6ayKb8dwZDNCbj7zaNA6EHC2WaHUBUP", //poster ipfs hash
                "",
                "QmVGRFzNZfgkUzxh8LjegwkPXPm7Q7u7MoYhpk7T7vAjYY", //previous video hash (if nothing don't show button)
                "Qmefzq9kEsQXmY1fcZSr2niWJ4XT9vszuS5xu9x6xeWSe7" //next video hash (if nothing don't show button)
            ];
            break;
        case 'Qmefzq9kEsQXmY1fcZSr2niWJ4XT9vszuS5xu9x6xeWSe7':
            var videoinfo = [
                "Usagi Drop - Ep02.5", //title
                "Qmefzq9kEsQXmY1fcZSr2niWJ4XT9vszuS5xu9x6xeWSe7", //video ipfs hash
                "Qma8abczUD4tRGZGcByWwYDaRsajQPeKxMGHzskbFndzJA", //poster ipfs hash
                "",
                "QmdDvsF4pBRxnakALiEdiVUvDHgGiZjmCaj5WGjcN2JxGX", //previous video hash (if nothing don't show button)
                "QmbToMxmqNQxwPqbpAthyRwvUhRNP2CdFoSafS4sPAZfWJ" //next video hash (if nothing don't show button)
            ];
            break;
        case 'QmbToMxmqNQxwPqbpAthyRwvUhRNP2CdFoSafS4sPAZfWJ':
            var videoinfo = [
                "Usagi Drop - Ep03", //title
                "QmbToMxmqNQxwPqbpAthyRwvUhRNP2CdFoSafS4sPAZfWJ", //video ipfs hash
                "QmcY9f42GTyMa17ZJrQ6vWzaDKLbeU7bbxcRc5o5WGyjTv", //poster ipfs hash
                "",
                "Qmefzq9kEsQXmY1fcZSr2niWJ4XT9vszuS5xu9x6xeWSe7", //previous video hash (if nothing don't show button)
                "QmUFexWJYCtH8KzBpp73q5uY3YKuiYcMFfCVNtdc7FmhVX" //next video hash (if nothing don't show button)
            ];
            break;
        case 'QmUFexWJYCtH8KzBpp73q5uY3YKuiYcMFfCVNtdc7FmhVX':
            var videoinfo = [
                "Usagi Drop - Ep03.5", //title
                "QmUFexWJYCtH8KzBpp73q5uY3YKuiYcMFfCVNtdc7FmhVX", //video ipfs hash
                "QmWywrTmUHDNdCjiaEWfMc29Xs3Z2LwsGky48GuEtfARnn", //poster ipfs hash
                "",
                "QmbToMxmqNQxwPqbpAthyRwvUhRNP2CdFoSafS4sPAZfWJ", //previous video hash (if nothing don't show button)
                "QmTagF2xxAWT5vVfCB29Ub23jUhqT3uoKPNaysLNRZCw1E" //next video hash (if nothing don't show button)
            ];
            break;
        case 'QmTagF2xxAWT5vVfCB29Ub23jUhqT3uoKPNaysLNRZCw1E':
            var videoinfo = [
                "Usagi Drop - Ep04", //title
                "QmTagF2xxAWT5vVfCB29Ub23jUhqT3uoKPNaysLNRZCw1E", //video ipfs hash
                "QmbqaQB9eTw54S2gt3rNS7yDeZHsc764ExpYdJyxHS6c35", //poster ipfs hash
                "",
                "QmUFexWJYCtH8KzBpp73q5uY3YKuiYcMFfCVNtdc7FmhVX", //previous video hash (if nothing don't show button)
                "QmWRWQ7y16VrfBVYERo44rJnY4k3Xq7adYj6wa13UhAKxg" //next video hash (if nothing don't show button)
            ];
            break;
        case 'QmWRWQ7y16VrfBVYERo44rJnY4k3Xq7adYj6wa13UhAKxg':
            var videoinfo = [
                "Usagi Drop - Ep05", //title
                "QmWRWQ7y16VrfBVYERo44rJnY4k3Xq7adYj6wa13UhAKxg", //video ipfs hash
                "QmVKGfBA4eD5VYZPGAzaXH8WYjzQ5bCUcmpaJbryeLJfBG", //poster ipfs hash
                "",
                "QmTagF2xxAWT5vVfCB29Ub23jUhqT3uoKPNaysLNRZCw1E", //previous video hash (if nothing don't show button)
                "QmTXSDZTAMTooXCRABSjRNKcDKsHqxFV1yQd2PMaDJVNqy" //next video hash (if nothing don't show button)
            ];
            break;
        case 'QmTXSDZTAMTooXCRABSjRNKcDKsHqxFV1yQd2PMaDJVNqy':
            var videoinfo = [
                "Usagi Drop - Ep06", //title
                "QmTXSDZTAMTooXCRABSjRNKcDKsHqxFV1yQd2PMaDJVNqy", //video ipfs hash
                "QmambNwPUsTGVGm2ZUASyg91iNbatLJUyoF48G4sD1RNrb", //poster ipfs hash
                "",
                "QmWRWQ7y16VrfBVYERo44rJnY4k3Xq7adYj6wa13UhAKxg", //previous video hash (if nothing don't show button)
                "QmdkfFWATWJpLAHJhGDNHqJFmQjVoweSG6ykddyXxkTCf7" //next video hash (if nothing don't show button)
            ];
            break;
        case 'QmdkfFWATWJpLAHJhGDNHqJFmQjVoweSG6ykddyXxkTCf7':
            var videoinfo = [
                "Usagi Drop - Ep06.5", //title
                "QmdkfFWATWJpLAHJhGDNHqJFmQjVoweSG6ykddyXxkTCf7", //video ipfs hash
                "QmYehz5KHcciMhDSP8MKWB7rXxgX7Q5Kjra4QW4oBG6ffi", //poster ipfs hash
                "",
                "QmTXSDZTAMTooXCRABSjRNKcDKsHqxFV1yQd2PMaDJVNqy", //previous video hash (if nothing don't show button)
                "QmaJEcn1VYFkzHhPteqxK5K4AZhpBzRUgcS7CxB3YW4u6u" //next video hash (if nothing don't show button)
            ];
            break;
        case 'QmaJEcn1VYFkzHhPteqxK5K4AZhpBzRUgcS7CxB3YW4u6u':
            var videoinfo = [
                "Usagi Drop - Ep07", //title
                "QmaJEcn1VYFkzHhPteqxK5K4AZhpBzRUgcS7CxB3YW4u6u", //video ipfs hash
                "QmVU14NFm9d1pMJxUh8o85EZRx3TMD4ZjBeKSAL8ZTb2Hn", //poster ipfs hash
                "",
                "QmdkfFWATWJpLAHJhGDNHqJFmQjVoweSG6ykddyXxkTCf7", //previous video hash (if nothing don't show button)
                "QmW78abKXCrQcAGFYVgYPf5ggESqXtJCYM9NvPmcUGpJFH" //next video hash (if nothing don't show button)
            ];
            break;
        case 'QmW78abKXCrQcAGFYVgYPf5ggESqXtJCYM9NvPmcUGpJFH':
            var videoinfo = [
                "Usagi Drop - Ep08", //title
                "QmW78abKXCrQcAGFYVgYPf5ggESqXtJCYM9NvPmcUGpJFH", //video ipfs hash
                "QmfMjP32sYumwv2szwwmjY7LPbWfSxXQpXgCNWRUrDS4nv", //poster ipfs hash
                "",
                "QmaJEcn1VYFkzHhPteqxK5K4AZhpBzRUgcS7CxB3YW4u6u", //previous video hash (if nothing don't show button)
                "QmaWeqQevh4eD3zAnR21U8jfembHyf5hR4dPPstDp7iH4W" //next video hash (if nothing don't show button)
            ];
            break;
        case 'QmaWeqQevh4eD3zAnR21U8jfembHyf5hR4dPPstDp7iH4W':
            var videoinfo = [
                "Usagi Drop - Ep08.5", //title
                "QmaWeqQevh4eD3zAnR21U8jfembHyf5hR4dPPstDp7iH4W", //video ipfs hash
                "Qmdgb6Kf5Q6LVnJYmnbNPMNX2cLNwdU1j3RsYSmNfo8GZC", //poster ipfs hash
                "",
                "QmW78abKXCrQcAGFYVgYPf5ggESqXtJCYM9NvPmcUGpJFH", //previous video hash (if nothing don't show button)
                "QmYz2uERweU9AnvKhHYJVhwn62SoVEcrKCbUHEK1euBgAE" //next video hash (if nothing don't show button)
            ];
            break;
        case 'QmYz2uERweU9AnvKhHYJVhwn62SoVEcrKCbUHEK1euBgAE':
            var videoinfo = [
                "Usagi Drop - Ep09", //title
                "QmYz2uERweU9AnvKhHYJVhwn62SoVEcrKCbUHEK1euBgAE", //video ipfs hash
                "QmUAGp1sJ5BZdbunPAx4kvgRBZ6CuULSu4qdg9KTuF4ccq", //poster ipfs hash
                "",
                "QmaWeqQevh4eD3zAnR21U8jfembHyf5hR4dPPstDp7iH4W", //previous video hash (if nothing don't show button)
                "QmXrSAex7VhwG19eSqhUcmUNLaZWHuiU45kyEHzri51m6x" //next video hash (if nothing don't show button)
            ];
            break;
        case 'QmXrSAex7VhwG19eSqhUcmUNLaZWHuiU45kyEHzri51m6x':
            var videoinfo = [
                "Usagi Drop - Ep10", //title
                "QmXrSAex7VhwG19eSqhUcmUNLaZWHuiU45kyEHzri51m6x", //video ipfs hash
                "QmPTQVv5pxMFAG4H5x3ymCbKsYAMKHoR8Q9z4VkKdNytD3", //poster ipfs hash
                "",
                "QmYz2uERweU9AnvKhHYJVhwn62SoVEcrKCbUHEK1euBgAE", //previous video hash (if nothing don't show button)
                "QmZnNHcrmWBcmGFsayi1dCC1W5XvU5psmaijXD42AEcPx1" //next video hash (if nothing don't show button)
            ];
            break;
        case 'QmZnNHcrmWBcmGFsayi1dCC1W5XvU5psmaijXD42AEcPx1':
            var videoinfo = [
                "Usagi Drop - Ep11", //title
                "QmZnNHcrmWBcmGFsayi1dCC1W5XvU5psmaijXD42AEcPx1", //video ipfs hash
                "QmYqBwXKWbQALoGcYt4QrNr2KmBdKSh2nff4gvggCn7XK5", //poster ipfs hash
                "",
                "QmXrSAex7VhwG19eSqhUcmUNLaZWHuiU45kyEHzri51m6x", //previous video hash (if nothing don't show button)
                "" //next video hash (if nothing don't show button)
            ];
            break;
        default:
            console.log('Didn\'t find video in switch array');
            return;
            break;
    }
    drawhash(videoinfo);


}