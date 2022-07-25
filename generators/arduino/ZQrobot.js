/**
 * Visual Blocks Language
 *
 * Copyright 2020 Arthur Zheng.
 * https://github.com/zhengyangliu/scratch-blocks
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

goog.provide('Blockly.Arduino.ZQrobot');

goog.require('Blockly.Arduino');

Blockly.Arduino['arduino_pin_ZQsetDigitalOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'LEVEL', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 'High';
  Blockly.Arduino.setups_['ZQsetDigitalOutput' + arg0] = 'pinMode(' + arg0 + ', OUTPUT);';
  var code = "digitalWrite(" + arg0 + ", " + arg1 + ");\n";
  return code;
};

Blockly.Arduino['arduino_pin_menu_level'] = function(block) {
  var code = block.getFieldValue('level') || 'High';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_ZQsetPwmOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

  var code = "analogWrite(" + arg0 + ", " + arg1 + ");\n";
  return code;
};

Blockly.Arduino['arduino_pin_ZQsetPwmOutput202'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg2 = '';
  if (arg0=='4') arg2='0';
  else if (arg0 == '5') arg2='1';
  else if (arg0 == '13') arg2='2';
  else if (arg0 == '23') arg2='3';
  else if (arg0 == '14') arg2='4';
  Blockly.Arduino.setups_['ZQsetPwmOutput202'+ arg0] = 'ledcSetup(' + arg2 + ',5000, 8);\nledcAttachPin(' + arg0 + ',' + arg2 + ');';
  var code = 'ledcWrite(' + arg2 + ', ' + arg1 + ');\n';
  return code;
};

//气泵
Blockly.Arduino['arduino_pin_ZQsetqibeng'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = block.getFieldValue('LEVEL') || 'High';
  Blockly.Arduino.setups_['ZQsetDigitalOutput' + arg0] = 'pinMode(' + arg0 + ', OUTPUT);';
  var code = "digitalWrite(" + arg0 + ", " + arg1 + ");\n";
  return code;
};

//蜂鸣器
Blockly.Arduino['arduino_pin_ZQsetbeep'] = function(block) {
  Blockly.Arduino.setups_['ZQsetbeep'] = 'pinMode(8, OUTPUT);';
  var arg1 = block.getFieldValue('LEVEL') || 'High';
  var code = "digitalWrite(8," + arg1 + ");\n";
  return code;
};

Blockly.Arduino['arduino_pin_ZQsetbeep202'] = function(block) {
  Blockly.Arduino.setups_['ZQsetbeep202'] = 'pinMode(2, OUTPUT);';
  var arg1 = block.getFieldValue('LEVEL') || 'High';
  var code = "digitalWrite(2," + arg1 + ");\n";
  return code;
};

Blockly.Arduino['arduino_pin_ZQreadDigitalPin'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '2';
  Blockly.Arduino.setups_['ZQsetDigitalOutput' + arg0] = "pinMode(" + arg0 + " , INPUT);";
  var code = "digitalRead(" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_ZQreadAnalogPin'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || 'P0';
  var code = "analogRead(" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//运行键
Blockly.Arduino['arduino_pin_ZQrun'] = function(block) {
  Blockly.Arduino.setups_['ZQrun'] = 'pinMode(13 , INPUT);';
  var code = "!digitalRead(13);";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_ZQrun202'] = function(block) {
  Blockly.Arduino.setups_['ZQrun202'] = 'pinMode(39 , INPUT);';
  var code = "!digitalRead(39);";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_ZQrunningTime'] = function(block) {
  var code = "millis()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//zq201EEPROM
Blockly.Arduino['arduino_pin_ZQEEPROMupdate'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  Blockly.Arduino.includes_['ZQEEPROMupdate'] = '#include <EEPROM.h>';
  var code = 'EEPROM.write(' + arg0 + ', ' + arg1 + ');\n';//EEPROM.write(addr, val);
  return code;
};

Blockly.Arduino['arduino_pin_ZQEEPROMread'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

  Blockly.Arduino.includes_['ZQEEPROMupdate'] = '#include <EEPROM.h>';

  var code = "EEPROM.read(" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_ZQdataMap'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = Blockly.Arduino.valueToCode(block, 'ARG0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg2 = Blockly.Arduino.valueToCode(block, 'ARG1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg3 = Blockly.Arduino.valueToCode(block, 'ARG2', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg4 = Blockly.Arduino.valueToCode(block, 'ARG3', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

  var code = "map(" + arg0 + "," + arg1 + "," + arg2 + "," + arg3 + "," + arg4 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//串口打印
Blockly.Arduino['arduino_pin_ZQserialPrint'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
  var eol = block.getFieldValue('EOL') || 'warp';
  Blockly.Arduino.setups_['ZQserialPrint'] = 'Serial.begin(9600);';
  var code = '';
  if (eol === 'warp') {
    code = 'Serial.println(' + arg0 + ');\n';
  } else {
    code = 'Serial.print(' + arg0 + ');\n';
  }
  return code;
};

Blockly.Arduino['arduino_pin_ZQserialAvailable'] = function() {

  Blockly.Arduino.setups_['ZQserialPrint'] = 'Serial.begin(9600);';
  var code = "Serial.available()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino['arduino_pin_ZQserialReadData'] = function() {

  Blockly.Arduino.setups_['ZQserialPrint'] = 'Serial.begin(9600);';
  var code = "Serial.read()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}

//执行器
Blockly.Arduino['arduino_actuator_InitsetMotor'] = function(block) {
  var arg0 = block.getFieldValue('ARG0') || '1';
  var arg1 = Blockly.Arduino.valueToCode(block, 'ARG1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg2 = block.getFieldValue('ARG2') || '2';
  var arg3 = Blockly.Arduino.valueToCode(block, 'ARG3', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  Blockly.Arduino.setups_['InitsetMotor'] = "Zqrobot.InitsetMotor(" + arg0 + "," + arg1 + "," + arg2 + "," + arg3 + ");";
  return "";
};

Blockly.Arduino['arduino_actuator_setMotor'] = function(block) {
  var arg0 = block.getFieldValue('PIN1') || '1';
  var arg1 = Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var code = "Zqrobot.setMotor(" + arg0 + "," + arg1 + ");\n";
  return code ;
};

Blockly.Arduino['arduino_actuator_ZQrun'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'SPEEDl', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = Blockly.Arduino.valueToCode(block, 'SPEEDr', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var code = "Zqrobot.run(" + arg0 + "," + arg1 + ");\n";
  return code ;
};

Blockly.Arduino['arduino_actuator_ZQsetServoOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

  Blockly.Arduino.includes_['ZQsetServoOutput'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['ZQsetServoOutput' + arg0] = 'Servo servo_' + arg0 + ';';
  Blockly.Arduino.setups_['ZQsetServoOutput' + arg0] = 'servo_' + arg0 + '.attach(' + arg0 + ');';
  
  var code = 'servo_' + arg0 + '.write' + '(' + arg1 + ');\n';
  return code;
}

Blockly.Arduino['arduino_actuator_setServo'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = block.getFieldValue('OUT') || '0';

  Blockly.Arduino.includes_['ZQsetServoOutput'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['ZQsetServoOutput' + arg0] = 'Servo servo_' + arg0 + ';';
  Blockly.Arduino.definitions_['servo_int' + arg0] = 'unsigned long servo_int' + arg0 + '=0;';
  Blockly.Arduino.setups_['ZQsetServoOutput' + arg0] = 'servo_' + arg0 + '.attach(' + arg0 + ');';
  var code="";
  if(arg1 == '0') {code="if(millis()>servo_int" + arg0 + "){servo_int" + arg0 + "=millis()+20;servo_" + arg0 + ".write(servo_" + arg0 + ".read()+2);}\n"}
  else {code="if(millis()>servo_int" + arg0 + "){servo_int" + arg0 + "=millis()+20;servo_" + arg0 + ".write(servo_" + arg0 + ".read()-2);}\n"}
  return code;
}

Blockly.Arduino['arduino_actuator_ZQsetServoRead'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '2';

  Blockly.Arduino.includes_['ZQsetServoOutput'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['ZQsetServoOutput' + arg0] = 'Servo servo_' + arg0 + ';';
  Blockly.Arduino.setups_['ZQsetServoOutput' + arg0] = 'servo_' + arg0 + '.attach(' + arg0 + ');';
  var code = 'servo_' + arg0 + '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino['arduino_actuator_ZQsetServoOutput202'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg2 = '';
  if (arg0=='4') arg2='0';
  else if (arg0 == '5') arg2='1';
  else if (arg0 == '13') arg2='2';
  else if (arg0 == '23') arg2='3';
  else if (arg0 == '14') arg2='4';
  Blockly.Arduino.includes_['ZQsetServoOutput202'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['ZQsetServoOutput202' + arg0] = 'Servo servo_' + arg0 + ';';
  Blockly.Arduino.setups_['ZQsetServoOutput202' + arg0] = 'servo_' + arg0 + '.attach(' + arg0 + ',' + arg2 + ');';
  
  var code = 'servo_' + arg0 + '.write' + '(' + arg1 + ');\n';
  return code;
}


Blockly.Arduino['arduino_actuator_setServo202'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = block.getFieldValue('OUT') || '0';
  var arg2 = '';
  if (arg0=='4') arg2='0';
  else if (arg0 == '5') arg2='1';
  else if (arg0 == '13') arg2='2';
  else if (arg0 == '23') arg2='3';
  else if (arg0 == '14') arg2='4';
  Blockly.Arduino.includes_['ZQsetServoOutput202'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['ZQsetServoOutput202' + arg0] = 'Servo servo_' + arg0 + ';';
  Blockly.Arduino.definitions_['servo_int202' + arg0] = 'unsigned long servo_int' + arg0 + '=0;';
  Blockly.Arduino.setups_['ZQsetServoOutput202' + arg0] = 'servo_' + arg0 + '.attach(' + arg0 + ',' + arg2 + ');';
  var code="";
  if(arg1 == '0') {code="if(millis()>servo_int" + arg0 + "){servo_int" + arg0 + "=millis()+20;servo_" + arg0 + ".write(servo_" + arg0 + ".read()+2);}\n"}
  else {code="if(millis()>servo_int" + arg0 + "){servo_int" + arg0 + "=millis()+20;servo_" + arg0 + ".write(servo_" + arg0 + ".read()-2);}\n"}
  return code;
}

Blockly.Arduino['arduino_actuator_ZQsetServoRead202'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '2';
  var arg2 = '';
  if (arg0=='4') arg2='0';
  else if (arg0 == '5') arg2='1';
  else if (arg0 == '13') arg2='2';
  else if (arg0 == '23') arg2='3';
  else if (arg0 == '14') arg2='4';
  Blockly.Arduino.includes_['ZQsetServoOutput202'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['ZQsetServoOutput202' + arg0] = 'Servo servo_' + arg0 + ';';
  Blockly.Arduino.setups_['ZQsetServoOutput202' + arg0] = 'servo_' + arg0 + '.attach(' + arg0 + ',' + arg2 + ');';
  var code = 'servo_' + arg0 + '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}

//遥控
Blockly.Arduino['arduino_Controller_setwx'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

  var wxid1= arg0.substr(1,2);
  var wxid2= arg0.substr(3,2);
  if(arg0.substr(1,1)=="0") wxid1= arg0.substr(2,1);
  if(arg0.substr(3,1)=="0") wxid2= arg0.substr(4,1);

  Blockly.Arduino.setups_['setwx201'] = 'Zqrobot.wx_ste(' + wxid1 + ', ' + wxid2 + ');';
  return '';
};

Blockly.Arduino['arduino_Controller_setwx202'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var wxid1= arg0.substr(1,2);
  var wxid2= arg0.substr(3,2);
  Blockly.Arduino.includes_['setwx202'] = '#include <Ps3Controller.h>';
  Blockly.Arduino.setups_['setwx202'] = 'Ps3.begin("01:02:03:04:' + wxid1 + ':' + wxid2 + '");\nwhile (!Ps3.isConnected());\nPs3.setRumble(100.0, 500);';
  return '';
};

Blockly.Arduino['arduino_Controller_rxdata201'] = function() {
  var code = 'Zqrobot.rx_data();\n';
  return code;
}

Blockly.Arduino['arduino_Controller_Readkeys201'] = function(block) {
  var arg0 = block.getFieldValue('PIN1');
  var arg1 = block.getFieldValue('PIN2');

  var code = 'Zqrobot.Read_keys(' + arg0 + ', ' + arg1 + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_Controller_Readkeys'] = function(block) {
  var arg0 = block.getFieldValue('PIN1');
  var arg1 = block.getFieldValue('PIN2');
  var arg2 = "";
  if (arg1 == '0'){
    if (arg0 == '1') arg2="Ps3.data.button.square";
    else if (arg0 == '2') arg2="Ps3.data.button.cross";
    else if (arg0 == '3') arg2="Ps3.data.button.circle";
    else if (arg0 == '4') arg2="Ps3.data.button.triangle";
    else if (arg0 == '5') arg2="Ps3.data.button.r1";
    else if (arg0 == '6') arg2="Ps3.data.button.r2";
    else if (arg0 == '7') arg2="Ps3.data.button.r3";
    else if (arg0 == '8') arg2="Ps3.data.button.l3";
    else if (arg0 == '9') arg2="Ps3.data.button.l2";
    else if (arg0 == '10') arg2="Ps3.data.button.l1";
    else if (arg0 == '11') arg2="Ps3.data.button.up";
    else if (arg0 == '12') arg2="Ps3.data.button.left";
    else if (arg0 == '13') arg2="Ps3.data.button.down";
    else if (arg0 == '14') arg2="Ps3.data.button.right";
    else if (arg0 == '15') arg2="Ps3.data.button.start";
    else if (arg0 == '16') arg2="Ps3.data.button.select";
  }
  else if (arg1 == '1'){
    if (arg0 == '1') arg2="Ps3.event.button.square";
    else if (arg0 == '2') arg2="Ps3.event.button.cross";
    else if (arg0 == '3') arg2="Ps3.event.button.circle";
    else if (arg0 == '4') arg2="Ps3.event.button.triangle";
    else if (arg0 == '5') arg2="Ps3.event.button.r1";
    else if (arg0 == '6') arg2="Ps3.event.button.r2";
    else if (arg0 == '7') arg2="Ps3.event.button.r3";
    else if (arg0 == '8') arg2="Ps3.event.button.l3";
    else if (arg0 == '9') arg2="Ps3.event.button.l2";
    else if (arg0 == '10') arg2="Ps3.event.button.l1";
    else if (arg0 == '11') arg2="Ps3.event.button.up";
    else if (arg0 == '12') arg2="Ps3.event.button.left";
    else if (arg0 == '13') arg2="Ps3.event.button.down";
    else if (arg0 == '14') arg2="Ps3.event.button.right";
    else if (arg0 == '15') arg2="Ps3.event.button.start";
    else if (arg0 == '16') arg2="Ps3.event.button.select";
  }
  

  var code =  arg2 ;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_Controller_ReadAnalog201'] = function(block) {
  var arg0 = block.getFieldValue('PIN1');
  var code = 'Zqrobot.Read_Analog(' + arg0 + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino['arduino_Controller_ReadAnalog'] = function(block) {
  var arg0 = block.getFieldValue('PIN1');
  if(arg0 == '1') arg0 = '-Ps3.data.analog.stick.ly';
  else if(arg0 == '2') arg0 = '-Ps3.data.analog.stick.lx';
  else if(arg0 == '3') arg0 = '-Ps3.data.analog.stick.ry';
  else if(arg0 == '4') arg0 = '-Ps3.data.analog.stick.rx';
  var code = arg0;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}

//rgb彩灯
Blockly.Arduino['arduino_RGBled_RGBld'] = function(block) {
  var arg0 = block.getFieldValue('PIN');
  var arg1 = Blockly.Arduino.valueToCode(block, 'PIN1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

  Blockly.Arduino.includes_['RGBled'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['RGBled' + arg0] = 'Adafruit_NeoPixel ledStrip_' + arg0 + '(1, ' + arg0 + ', NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['RGBled' + arg0] = 'ledStrip_' + arg0 + '.begin();';

  var code = 'ledStrip_' + arg0 + '.setBrightness(' + arg1 + ');\n';
  return code;
};

Blockly.Arduino['arduino_RGBled_RGBLED'] = function(block) {
  var arg0 = block.getFieldValue('PIN');
  var arg1 = Blockly.Arduino.valueToCode(block, 'PIN1', Blockly.Arduino.ORDER_ATOMIC).replace('#', '0x');

  Blockly.Arduino.includes_['RGBled'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['RGBled' + arg0] = 'Adafruit_NeoPixel ledStrip_' + arg0 + '(1, ' + arg0 + ', NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['RGBled' + arg0] = 'ledStrip_' + arg0 + '.begin();';

  var code = 'ledStrip_' + arg0 + '.setPixelColor(0, ' + arg1 + ');\nledStrip_' + arg0 + '.show();\n';
  return code;
};

Blockly.Arduino['arduino_RGBled_RGBLED1'] = function(block) {
  var arg0 = block.getFieldValue('PIN');
  var arg1 = block.getFieldValue('PIN1');
  Blockly.Arduino.includes_['RGBled'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['RGBled' + arg0] = 'Adafruit_NeoPixel ledStrip_' + arg0 + '(1, ' + arg0 + ', NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['RGBled' + arg0] = 'ledStrip_' + arg0 + '.begin();';

  var code = 'ledStrip_' + arg0 + '.setPixelColor(0, ' + arg1 + ');\nledStrip_' + arg0 + '.show();\n';
  return code;
};

Blockly.Arduino['arduino_RGBled_RGBLED2'] = function(block) {
  var arg0 = block.getFieldValue('PIN');
  var arg1 = Blockly.Arduino.valueToCode(block, 'PIN1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg2 = Blockly.Arduino.valueToCode(block, 'PIN2', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg3 = Blockly.Arduino.valueToCode(block, 'PIN3', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

  Blockly.Arduino.includes_['RGBled'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['RGBled' + arg0] = 'Adafruit_NeoPixel ledStrip_' + arg0 + '(1, ' + arg0 + ', NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['RGBled' + arg0] = 'ledStrip_' + arg0 + '.begin();';

  var code = 'ledStrip_' + arg0 + '.setPixelColor(0, ledStrip_' + arg0 + '.Color(' + arg1 + ',' + arg2 + ',' + arg3 + '));\nledStrip_' + arg0 + '.show();\n';
  return code;
};

//颜色传感器
Blockly.Arduino['arduino_ZQCOLOR_COLORcgq'] = function(block) {
  var arg0 = block.getFieldValue('PIN1');

  Blockly.Arduino.includes_['COLORcgq'] = '#include <Wire.h>\n#include <MH_TCS34725.h>';
  Blockly.Arduino.definitions_['COLORcgq'] = 'MH_TCS34725 tcs = MH_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X);';
  Blockly.Arduino.setups_['COLORcgq'] = 'tcs.begin();';

  var code = 'tcs.getRGBZQ(' + arg0 + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}

//巡线模块
Blockly.Arduino['arduino_ZQpatrol_InitMOTOR'] = function(block) {
  var arg0 = block.getFieldValue('PIN7');
  var arg1 = block.getFieldValue('PIN1');
  var arg2 = block.getFieldValue('PIN2');
  var arg3 = block.getFieldValue('PIN3');
  var arg4 = block.getFieldValue('PIN4');
  var arg5 = block.getFieldValue('PIN5');
  var arg6 = Blockly.Arduino.valueToCode(block, 'PIN6', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

  Blockly.Arduino.setups_['InitMOTOR'] = 'Zqrobot.Initline(' + arg1 + ',' + arg2 + ',' + arg3 + ',' + arg4 + ',' + arg5 + ',' + arg0 + ',' + arg6 + ');';
  return "";
};

Blockly.Arduino['arduino_ZQpatrol_Floorsensor'] = function() {
  return "Zqrobot.Set_Floorsensor();\n";
};

Blockly.Arduino['arduino_ZQpatrol_straight'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'PIN1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  return 'Zqrobot.straight(' + arg0 + ');\n';
};

Blockly.Arduino['arduino_ZQpatrol_ZQline'] = function(block) {
  var arg0 = block.getFieldValue('PIN1');
  var arg1 = Blockly.Arduino.valueToCode(block, 'PIN2', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg2 = Blockly.Arduino.valueToCode(block, 'PIN3', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg3 = block.getFieldValue('PIN4');
  return 'Zqrobot.ZQ_line(' + arg0 + ',' + arg1 + ',' + arg2 + ',' + arg3 + ');\n';
};

Blockly.Arduino['arduino_ZQpatrol_linetime'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'PIN1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = Blockly.Arduino.valueToCode(block, 'PIN2', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg2 = block.getFieldValue('PIN3');
  return 'Zqrobot.line_time(' + arg0 + ',' + arg1 + ',' + arg2 + ');\n';
};

Blockly.Arduino['arduino_ZQpatrol_linesensor'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'PIN1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = block.getFieldValue('PIN2');
  var arg2 = block.getFieldValue('PIN3');
  var arg3 = Blockly.Arduino.valueToCode(block, 'PIN4', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  return 'Zqrobot.line_sensor(' + arg0 + ',' + arg1 + ',' + arg2 + ',' + arg3 + ');\n';
};

Blockly.Arduino['arduino_ZQpatrol_lineturn'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'PIN1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = Blockly.Arduino.valueToCode(block, 'PIN2', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg2 = block.getFieldValue('PIN3');
  return 'Zqrobot.line_turn(' + arg2 + ',' + arg0 + ',' + arg1 + ');\n';
};

Blockly.Arduino['arduino_ZQpatrol_gotime'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'PIN1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = Blockly.Arduino.valueToCode(block, 'PIN2', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg2 = Blockly.Arduino.valueToCode(block, 'PIN3', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  return 'Zqrobot.go_time(' + arg0 + ',' + arg1 + ',' + arg2 + ');\n';
};

Blockly.Arduino['arduino_ZQpatrol_gosensor'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'PIN1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = Blockly.Arduino.valueToCode(block, 'PIN2', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg2 = block.getFieldValue('PIN3');
  var arg3 = block.getFieldValue('PIN4');
  var arg4 = Blockly.Arduino.valueToCode(block, 'PIN5', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  return 'Zqrobot.go_sensor(' + arg0 + ',' + arg1 + ',' + arg2 + ',' + arg3 + ',' + arg4 + ');\n';
};

Blockly.Arduino['arduino_ZQpatrol_next'] = function() {
  return 'Zqrobot.ZQ_next();\n';
};




//舵机 if(millis()>servo_int2){servo_int2=millis()+20;servo_2.write(servo_2.read()+2);}
/*
Blockly.Arduino['arduino_MOTOR_zq202SetServoOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  //var arg2 = block.getFieldValue('CH') || '0';

  Blockly.Arduino.includes_['zq202SetServoOutput'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['zq202SetServoOutput' + arg0] = 'Servo servo_' + arg0 + ';';
  Blockly.Arduino.setups_['zq202SetServoOutput' + arg0] = 'servo_' + arg0 + '.attach' + '(' + arg0 + ', ' + arg0 + ');';

  var code = 'servo_' + arg0 + '.write' + '(' + arg1 + ');\n';
  return code;
};*/

//zq202EEPROMupdate
Blockly.Arduino['arduino_pinZQ_zq202EEPROMupdate'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

  Blockly.Arduino.includes_['zq202EEPROMupdate'] = '#include <EEPROM.h>';
  Blockly.Arduino.setups_['zq202EEPROMupdate'] ='EEPROM.begin(1024);';
  var code = 'EEPROM.writeZQ(' + arg0 + ', ' + arg1 + ');\n';//EEPROM.write(addr, val);
  return code;
};
//EEPROM 读取
Blockly.Arduino['arduino_pinZQ_zq202EEPROMread'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

  Blockly.Arduino.includes_['zq202EEPROMupdate'] = '#include <EEPROM.h>';
  Blockly.Arduino.setups_['zq202EEPROMupdate'] ='EEPROM.begin(1024);';

  var code = "EEPROM.readZQ(" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*
Blockly.Arduino['arduino_pin_zq202SetServoOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg2 = block.getFieldValue('CH') || '0';

  Blockly.Arduino.includes_['zq202SetServoOutput'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['zq202SetServoOutput' + arg0] = 'Servo servo_' + arg0 + ';';
  Blockly.Arduino.setups_['zq202SetServoOutput' + arg0] = 'servo_' + arg0 + '.attach' + '(' + arg0 + ', ' + arg2 + ');';

  var code = 'servo_' + arg0 + '.write' + '(' + arg1 + ');\n';
  return code;
};

Blockly.Arduino['arduino_pin_esp32AttachInterrupt'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = block.getFieldValue('MODE') || 'RISING';

  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  Blockly.Arduino.definitions_['definitions_ISR_' + arg1 + arg0] =
    'void IRAM_ATTR ISR_' + arg1 + '_' + arg0 + '() {\n' + branch + '}';

  var code = 'attachInterrupt(' + arg0 + ', ISR_' + arg1 + '_' + arg0 + ', ' + arg1 + ');\n';
  return code;
};

Blockly.Arduino['arduino_pin_esp32DetachInterrupt'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';

  var code = 'detachInterrupt(' + arg0 + ');\n';
  return code;
};

Blockly.Arduino['arduino_sensor_esp32ReadHallSensor'] = function() {
  var code = "hallRead()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
*/
