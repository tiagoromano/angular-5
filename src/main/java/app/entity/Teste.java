package app.entity;

import java.math.BigDecimal;
import java.text.DecimalFormat;

public class Teste {

  public static void main(String... args) {
    double a = 0.02;
    double b = 0.03;
    double c = b - a;
    double d = c * 2;
    double e = 0.014 + 0.013 + 0.013;
    DecimalFormat df = new DecimalFormat("0.00");
//    System.out.println(a);
//    System.out.println(b);
//    System.out.println(c);
    System.out.println(df.format(c));
    System.out.println(df.format(d));
    System.out.println(df.format(e));

    BigDecimal _a = new BigDecimal("0.02");
    BigDecimal _b = new BigDecimal("0.03");
    BigDecimal _c = _b.subtract(_a);
    //System.out.println(_c);
  }

}
