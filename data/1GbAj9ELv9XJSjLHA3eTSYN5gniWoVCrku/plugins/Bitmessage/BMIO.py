import base64

from .BMAPI import BMAPI

def BMS_encode(text, encode_type):
    # base64 or hexlify encode
    # decode_type: 'hex' or 'base64'

    if encode_type == 'hex':
        return hexlify(text)
    elif encode_type == 'base64':  # for label/passphrase/ripe/subject/message
        return base64.b64encode(text).decode('utf-8')

def sendMessage(sender, recipient, subject, body):
    encSub = BMS_encode(subject.encode(encoding='utf-8'), 'base64')
    encBody = BMS_encode(body.encode(encoding='utf-8'), 'base64')
    ackData = BMAPI().conn().sendMessage(recipient, sender, encSub, encBody, 2)
    return {"error": 0, "result": ackData, "to": recipient, "from": sender, "subject": subject, "body": body}
