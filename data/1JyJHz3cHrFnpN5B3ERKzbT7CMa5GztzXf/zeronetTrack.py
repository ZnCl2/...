#! /usr/bin/python
import teslajson, gpxpy
import subprocess, json, webbrowser, getpass, time, datetime

zeroNetDir        = '/home/richi/Downloads/ZeroNet-master'
zeroNetPrivateKey = 'privateMeansSecret'
zeroNetAddress    = '1JyJHz3cHrFnpN5B3ERKzbT7CMa5GztzXf'
zeroNetDataDir    = '/home/richi/.local/share/ZeroNet'
siteDir           = zeroNetDataDir + '/1JyJHz3cHrFnpN5B3ERKzbT7CMa5GztzXf'

gpx_file = open(siteDir + '/track.gpx', 'r')
gpx = gpxpy.parse(gpx_file)
gpx_file.close()
segment = gpx.tracks[0].segments[0]

result = subprocess.Popen(['gpg', '-d', '.pass.gpg'], stdout=subprocess.PIPE)
passwd = result.communicate()[0]

if passwd == '':
    passwd = getpass.getpass()

lastLat = None
lastLon = None
maxChargeRate = 0.0

while True:
    try:
        conn = teslajson.Connection('richi@paraeasy.ch', passwd)
        blitz = conn.vehicles[0]
    #    blitz.wake_up()
        state = blitz.data_request('drive_state')
        charge_state = blitz.data_request('charge_state')

        if charge_state['charge_rate'] <= 0.0 and maxChargeRate > 0.0:
            # write the last charge to file
            with open(siteDir + '/charges.txt', 'a') as outfile:  
                outfile.write(str(lastLat) + '\t' + str(lastLon) + '\t' +
                              'Ladestation' + '\t' +
                              'Ladegeschwindigkeit:<br><b>' + str(maxChargeRate * 1.609344) + ' km/h</b><br>' +
                              'Hinzugef&uuml;gte Energie:<br><b>' + str(charge_state['charge_energy_added']) + ' kWh</b>\t' +
                              'charge.png' +  '\n')
            maxChargeRate = 0.0

        if state['latitude'] != lastLat and state['longitude'] != lastLon:
            # append the current position to the track
            timestamp = datetime.datetime.fromtimestamp(time.time())
            segment.points.append(gpxpy.gpx.GPXTrackPoint(state['latitude'], state['longitude'], time=timestamp))
            gpx_file = open(siteDir + '/track.gpx', 'w')
            gpx_file.write(gpx.to_xml())
            gpx_file.close()

            # write the current position to a separate file
            with open(siteDir + '/current.json', 'w') as outfile:  
                json.dump({'lat' : state['latitude'], 'lon' : state['longitude']}, outfile)

        # publish to zeronet
        result = subprocess.Popen(['python', 'zeronet.py', '--data_dir', zeroNetDataDir, 'siteSign', zeroNetAddress, zeroNetPrivateKey], cwd=zeroNetDir)
        result.communicate()
        result = subprocess.Popen(['python', 'zeronet.py', '--data_dir', zeroNetDataDir, 'sitePublish', zeroNetAddress], cwd=zeroNetDir)
        result.communicate()

        lastLat = state['latitude']
        lastLon = state['longitude']
        if charge_state['charge_rate'] > maxChargeRate:
            maxChargeRate = charge_state['charge_rate']
    except Exception, ex:
        print('An error occurred: ' + str(ex))


    time.sleep(60 * 5) # five minutes


