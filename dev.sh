rbenv rehash

SASSPID=`ps aux | grep [s]ass | awk '{ print $2 }'`
GRUNTPID=`ps aux | grep [g]runt | awk '{ print $2 }'`
GULPPID=`ps aux | grep [g]ulp | awk '{ print $2 }'`
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
if [ "`echo $GULPPID`" != "" ]; then
	echo kill gulp $GULPPID
	kill -TERM `echo $GULPPID`
else
	echo gulp stopped
fi

if [ ! -d './tmp' ]; then
	mkdir tmp
fi
if [ "$1" = "" -o "$1" = "start" ];then
#	echo start sass
#	PATH=${PATH}:.bundle/bin/
#	sass --watch scss:css --style compressed > tmp/sass.log 2>&1 &
#	echo $! > tmp/sass.pid
#	PATH=${PATH}:$(npm bin)
#	echo start grunt
#	grunt > tmp/grunt.log 2>&1 &
#	echo $! > tmp/grunt.pid
	PATH=${PATH}:$(npm bin)
	echo start gulp
	gulp > tmp/gulp.log 2>&1 &
	echo $! > tmp/gulp.pid
fi
