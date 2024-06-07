package cc.codegen.plugins.specification.utils

import cn.hutool.core.util.RuntimeUtil

import javax.sound.sampled.AudioFormat
import javax.sound.sampled.AudioSystem
import javax.sound.sampled.LineUnavailableException
import javax.sound.sampled.SourceDataLine

class SoundUtils {
    public static float SAMPLE_RATE = 8000f;

    public static void tone(int hz, int msecs)
            throws LineUnavailableException {
        tone(hz, msecs, 1.0);
    }

    public static void ok_tone(){
        RuntimeUtil.exec("afplay /System/Library/Sounds/Funk.aiff")
    }

    public static void tone(int hz, int msecs, double vol)
            throws Throwable {
        ok_tone()
//       GUtils.highrun({
//        byte[] buf = new byte[1];
//        AudioFormat af =
//                new AudioFormat(
//                        SAMPLE_RATE, // sampleRate
//                        8,           // sampleSizeInBits
//                        1,           // channels
//                        true,        // signed
//                        false);      // bigEndian
//        SourceDataLine sdl = AudioSystem.getSourceDataLine(af);
//        sdl.open(af);
//        sdl.start();
//        for (int i = 0; i < msecs * 8; i++) {
//            double angle = i / (SAMPLE_RATE / hz) * 2.0 * Math.PI;
//            buf[0] = (byte) (Math.sin(angle) * 127.0 * vol);
//            sdl.write(buf, 0, 1);
//        }
//        sdl.drain();
//        sdl.stop();
//        sdl.close();
//       })
    }

    public static void tone_2(int hz, int msecs, double vol)
            throws Throwable {
            ok_tone()
//            byte[] buf = new byte[1];
//            AudioFormat af =
//                    new AudioFormat(
//                            SAMPLE_RATE, // sampleRate
//                            8,           // sampleSizeInBits
//                            1,           // channels
//                            true,        // signed
//                            false);      // bigEndian
//            SourceDataLine sdl = AudioSystem.getSourceDataLine(af);
//            sdl.open(af);
//            sdl.start();
//            for (int i = 0; i < msecs * 8; i++) {
//                double angle = i / (SAMPLE_RATE / hz) * 2.0 * Math.PI;
//                buf[0] = (byte) (Math.sin(angle) * 127.0 * vol);
//                sdl.write(buf, 0, 1);
//            }
//            sdl.drain();
//            sdl.stop();
//            sdl.close();
    }

//        tone(1000, 100);
//        Thread.sleep(1000);
//        tone(100, 1000);
//        Thread.sleep(1000);
//        tone(5000, 100);
//        Thread.sleep(1000);
//        tone(400, 500);
//        Thread.sleep(1000);

    public static void beep() throws Exception {
//        tone(5000, 1000);
//        tone(5000, 1000);
//        tone(400, 500, 0.1);
//        Thread.sleep(1000);
        tone(400, 300, 0.1);
//        Thread.sleep(1000);
//        tone(400, 1000,0.1);
//        Thread.sleep(1000);
    }

    public static void longBeep() throws Exception {
//        tone(5000, 1000);
//        tone(5000, 1000);
//        tone(400, 500, 0.1);
//        Thread.sleep(1000);
        popError();
//        tone(400, 3000, 0.1);
//        Thread.sleep(1000);
//        tone(400, 1000,0.1);
//        Thread.sleep(1000);
    }

    public static void longBeepWhile() throws Exception {
//        tone(5000, 1000);
//        tone(5000, 1000);
//        tone(400, 500, 0.1);
//        Thread.sleep(1000);
        while (true) {
//            tone(400, 3000, 0.1);
            popError();
        }
//        Thread.sleep(1000);
//        tone(400, 1000,0.1);
//        Thread.sleep(1000);
    }

    static void main(String[] args) {
        RuntimeUtil.exec("afplay /System/Library/Sounds/Funk.aiff")
    }

    static void popError() {
        RuntimeUtil.exec("say -v Samantha \"Detected An Error\"")
        def i = 0;
        while (i < 10) {
            RuntimeUtil.exec("afplay /System/Library/Sounds/Pop.aiff")
            sleep(1000)
            i++
        }
    }

}
