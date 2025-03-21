package com.app.rally.data.domain;

import java.time.Duration;
import java.time.Year;
public class esting {
    public static void main(String[] args) {
        System.out.println("Hello, World!");


        Duration duration = Duration.ofMinutes(1).plusSeconds(2).plusMillis(3);
        System.out.println(duration);

        Year year = Year.of(2024);

        System.out.println(year);
    }
}

