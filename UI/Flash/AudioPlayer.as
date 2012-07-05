package{
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.media.SoundTransform;
	import flash.net.URLRequest;
	import flash.events.Event;
	import flash.display.Sprite;
	
	public class AudioPlayer extends Sprite{
		protected var _sound:Sound;
		protected var _soundChannel:SoundChannel;
		protected var _soundTransform:SoundTransform;
		protected var _currentFile:String;
		protected var _currentPosition:Number;
		protected var _volume:Number;
		protected var _isMuted:Boolean;
		protected var _isPlaying:Boolean;
		
		public function AudioPlayer():void{
			_currentPosition = 0;
			_volume = 1;
			_isPlaying = false;
		}
		
		public function load(pathToMP3:String , autoPlay:Boolean = true):void{
			_currentFile = pathToMP3;
			_sound = new Sound();
			_sound.load(new URLRequest(_currentFile));
			_sound.addEventListener(Event.COMPLETE , function(e:Event):void{
									if(autoPlay){
										play();
									}
									
									dispatchEvent(new Event("READY"));
									dispatchEvent(new Event("STATUS_CHANGE"));
									});
		}
		
		public function play(startPosition:Number = 0):void{
			if(_isPlaying) return;
			
			_soundChannel = _sound.play(startPosition);
			_soundChannel.addEventListener(Event.SOUND_COMPLETE , function(e:Event):void{
										   dispatchEvent(new Event("FINISH"));
										   });
			_isPlaying = true;
			
			dispatchEvent(new Event("STATUS_CHANGE"));
		}
		
		public function pause():void{
			if(!_isPlaying) return;
			
			_currentPosition = _soundChannel.position;
			_soundChannel.stop();
			_isPlaying = false;
			
			dispatchEvent(new Event("STATUS_CHANGE"));
		}
		
		public function resume():void{
			if(_isPlaying) return;
			
			if(_currentFile){
				this.play(_currentPosition);
			}
			_isPlaying = true;
			
			dispatchEvent(new Event("STATUS_CHANGE"));
		}
		
		public function stop():void{
			_currentPosition = 0;
			_soundChannel.stop();
			_isPlaying = false;
			
			dispatchEvent(new Event("STATUS_CHANGE"));
		}
		
		public function seekTo(v:Number):void{
			_currentPosition = v;
			this.play(_currentPosition);
		}
		
		public function setVolume(v:Number):void{
			_volume = v;
			_soundTransform = _soundChannel.soundTransform;
			_soundTransform.volume = _volume;
			_soundChannel.soundTransform = _soundTransform;
		}
		
		public function mute():void{
			_soundTransform = _soundChannel.soundTransform;
			_soundTransform.volume = 0;
			_soundChannel.soundTransform = _soundTransform;
			_isMuted = true;
			
			dispatchEvent(new Event("MUTE_STATUS_CHANGE"));
		}
		
		public function unMute():void{
			_soundTransform = _soundChannel.soundTransform;
			_soundTransform.volume = _volume;
			_soundChannel.soundTransform = _soundTransform;
			_isMuted = false;
			
			dispatchEvent(new Event("MUTE_STATUS_CHANGE"));
		}
		
		public function get isMuted():Boolean{
			return _isMuted;
		}
		
		public function get isPlaying():Boolean{
			return _isPlaying;
		}
		
		public function get currentTime():Number{
			return _soundChannel ? _soundChannel.position : 0;
		}
		
		public function get totalTime():Number{
			return _sound ? _sound.length : 0;
		}
		
		public function get bytesLoaded():Number{
			return _sound.bytesLoaded;
		}
		
		public function get bytesTotal():Number{
			return _sound.bytesTotal;
		}
		
		public function get volume():Number{
			return _volume;
		}
		
	}
	
}