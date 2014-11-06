class AddArchivedBroadcastsRoleToUsers < ActiveRecord::Migration
  def self.up
    role = Role.where(role: 'archived_broadcasts').first
    User.all.each do |u|
      u.roles << role
    end
    regular = Role.where(role: 'Regular').first
    %w(
    00beni@gmail.com advertpro@gmail.com afinka77@gmail.com afterehov@gmail.com aleph111@hotmail.fr an4ous81@gmail.com
    anaelkab@gmail.com andrej804@gmail.com annakogan.doc@gmail.com antey125@gmail.com apdo76@gmail.com aramdi@mail.ru
    argnttng@netscape.net asaf.bentov@gmail.com avaya26@gmail.com aviavi01@gmail.com AviLevyshef@gmail.com avivit02@gmail.com
    baruchi01@gmail.com bb.yulia@gmail.com BB_KOSTROMA@YAHOO.COM bbag0815@mail.ru bbkabtvru@gmail.com cohava.shale@gmail.com
    cohenesis@gmail.com diamant.zvi@gmail.com dimitri.pekarovsky@gmail.com dimytch@jvs-service.com.ua dudital2009@gmail.com
    dvekut@bk.ru egon82@arcor.de erezlevibb@gmail.com esty16@walla.com ewgenikuleschov@googlemail.com gal.prety@gmail.com
    goren7373@gmail.com hadas.ofer10@gmail.com haimyarimi@gmail.com helesinise@hot.ee hilduza@gmail.com ibrodskyster@gmail.com
    invar2002@gmail.com itzikh3@gmail.com jdevee@gmail.com jumusina@gmail.com kbkabkab@gmail.com kochava.tov@gmail.com
    krs2k44@gmail.com lakshmikab66@gmail.com lazurinka12@gmail.com lena.near@gmail.com luvtrebbe@yahoo.com mara.fn.rina@gmail.com
    MELMAN63@MAIL.RU menudit@sde-boker.org.il michaelzilbershtein@gmail.com michaelzilbershtein@yahoo.com misokolov67@gmail.com
    mozes1001@gmail.com nata.ada@gmail.com natali9723@mail.ru o546850736@gmail.com oleneshk2@gmail.com omerklt@gmail.com
    orifarjun@gmail.com pavellemann@gmail.com perc5nt20@yahoo.com pini.gershon70@gmail.com reiviz@gmail.com
    ressler@013.net rudis25@inbox.lv saragley@gmail.com sashashabb@yahoo.co.uk shuniata@gmail.com sibkabbalah@yandex.ru
    simantov4@bezeqint.net slavik.od@gmail.com sposoben@gmail.com terriahester@gmail.com travin-1@rambler.ru
    visotzki@gmail.com vladimir.kropylev@gmail.com yaelior.bb@gmail.com yana.yaakobi@gmail.com yaronlbb@gmail.com
    yd57@netvision.net.il zzvladimir@gmail.com
    ).each do |e|
      user = User.where(email: e.downcase).first
      user && user.roles = [regular] || puts("User #{e} does not exists")
    end
  end

  def self.down
  end
end
