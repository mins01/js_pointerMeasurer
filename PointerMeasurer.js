"use strict";
/**
 * 포인터 간의 정보 측정(계산)
 */
class PointerMeasurer{
  pointerId = null;
  isPrimary = false;
  first = {
    x:null,
    y:null,
    timeStamp:null,
  };
  current = {
    x:null,
    y:null,
    timeStamp:null,
  };
  event = null;
  
  constructor(event){
    this.first = {
      x:null,
      y:null,
      timeStamp:null,
    };
    this.current = {
      x:null,
      y:null,
      timeStamp:null,
    };
    
    if(event){
      this.setEvent(event);
    }
  }
  setEvent(event){
    if(this.event==null){
      this.event = event;
      this.pointerId = event.pointerId,
      this.isPrimary = event.isPrimary,
      this.setFirst(event);
    }
    this.setCurrent(event);
  }

  setFirst(pointer){
    this.first.x = pointer.pageX;
    this.first.y = pointer.pageY;
    this.first.timeStamp = pointer.timeStamp;
  }
  
  setCurrent(pointer){
    this.current.x = pointer.pageX;
    this.current.y = pointer.pageY;
    this.current.timeStamp = pointer.timeStamp;
  }
  
  get duration(){ return this.current.timeStamp - this.first.timeStamp; }
  get distanceX(){ return this.current.x - this.first.x; }
  get distanceY(){ return this.current.y - this.first.y; }
  get distance(){ return Math.sqrt(Math.pow(this.distanceX,2) + Math.pow(this.distanceY,2)); }
  get angle(){ return Math.atan2(this.current.y - this.first.y,this.current.x - this.first.x); }
  get velocityX(){ return this.duration?Math.abs(this.distanceX) / this.duration:0; }
  get velocityY(){ return this.duration?Math.abs(this.distanceY) / this.duration:0; }
  get velocity(){ return this.duration?Math.abs(this.distance) / this.duration:0; }

  distanceBetween(other){ 
    return Math.sqrt(Math.pow(other.current.x - this.current.x,2) + Math.pow(other.current.y - this.current.y,2))
  }
  angleBetween(other){ 
    return Math.atan2(other.current.y - this.current.y,other.current.x - this.current.x);
  }


}