rbenv rehash

SASSPID=`ps aux | grep [s]ass | awk '{ print $2 }'`
GRUNTPID=`ps aux | grep [g]runt | awk '{ print $2 }'`
if [ "`echo $SASSPID`" != "" ]; then
	echo kill sass $SASSPID
	kill -TERM `echo $SASSPID`
else
	echo sass stopped
fi
if [ "`echo $GRUNTPID`" != "" ]; then
	echo kill grunt $GRUNTPID
	kill -TERM `echo $GRUNTPID`
else
	echo grunt stopped
fi

if [ "$1" = "" -o "$1" = "start" ];then
	echo start sass
	sass --watch scss:css --style compressed > tmp/sass.log 2>&1 &
	echo $! > tmp/sass.pid
	PATH=${PATH}:$(npm bin)
	echo start grunt
	`npm bin`/grunt > tmp/grunt.log 2>&1 &
	echo $! > tmp/grunt.pid
fi
