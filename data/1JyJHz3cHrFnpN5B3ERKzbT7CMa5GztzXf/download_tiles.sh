#! /bin/bash

currDir=$PWD

# zoom level 9
zoomLevel=9
for x in {262..273}
do
    mkdir -p $currDir/tiles/$zoomLevel/$x

    for y in {144..180}
    do
        if [ ! -f $currDir/tiles/$zoomLevel/$x/$y.png ]; then
		wget -O $currDir/tiles/$zoomLevel/$x/$y.png http://b.tile.openstreetmap.org/$zoomLevel/$x/$y.png
	fi
    done
done

# zoom level 8
zoomLevel=8
for x in {129..138}
do
    mkdir -p $currDir/tiles/$zoomLevel/$x

    for y in {71..91}
    do
        if [ ! -f $currDir/tiles/$zoomLevel/$x/$y.png ]; then
        	wget -O $currDir/tiles/$zoomLevel/$x/$y.png http://b.tile.openstreetmap.org/$zoomLevel/$x/$y.png
	fi
    done
done

# zoom level 7
zoomLevel=7
for x in {65..69}
do
    mkdir -p $currDir/tiles/$zoomLevel/$x

    for y in {35..46}
    do
        if [ ! -f $currDir/tiles/$zoomLevel/$x/$y.png ]; then
        	wget -O $currDir/tiles/$zoomLevel/$x/$y.png http://b.tile.openstreetmap.org/$zoomLevel/$x/$y.png
	fi
    done
done

# zoom level 6
zoomLevel=6
for x in {31..36}
do
    mkdir -p $currDir/tiles/$zoomLevel/$x

    for y in {17..23}
    do
        if [ ! -f $currDir/tiles/$zoomLevel/$x/$y.png ]; then
        	wget -O $currDir/tiles/$zoomLevel/$x/$y.png http://b.tile.openstreetmap.org/$zoomLevel/$x/$y.png
	fi
    done
done

# zoom level 5
zoomLevel=5
for x in {14..19}
do
    mkdir -p $currDir/tiles/$zoomLevel/$x

    for y in {9..12}
    do
        if [ ! -f $currDir/tiles/$zoomLevel/$x/$y.png ]; then
        	wget -O $currDir/tiles/$zoomLevel/$x/$y.png http://b.tile.openstreetmap.org/$zoomLevel/$x/$y.png
	fi
    done
done

