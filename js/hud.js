class HUD {
    constructor(game, pStats) {
        this.group = game.add.group();

        this.health = this.group.create(20, 50, 'health');
        this.hunger = this.group.create(20, 80, 'hunger');
        this.sanity = this.group.create(20, 115, 'mental');

        this.health.fixedToCamera = true;
        this.hunger.fixedToCamera = true;
        this.sanity.fixedToCamera = true;

        this.health.scale.setTo(0.5, 0.5);
        this.hunger.scale.setTo(0.5, 0.5);
        this.sanity.scale.setTo(0.5, 0.5);

        this.graphicsHealth = game.add.graphics(100, 15);
        this.graphicsHealth.lineStyle(1, 0xFFFF00, 1);
        this.graphicsHealth.drawRect(0, 45, 100, 15);
        this.graphicsHealth.endFill();

        this.graphicsHunger = game.add.graphics(100, 15);
        this.graphicsHunger.lineStyle(1, 0xFFFF00, 1);
        this.graphicsHunger.drawRect(0, 75, 100, 15);
        this.graphicsHunger.endFill();

        this.graphicsSanity = game.add.graphics(100, 15);
        this.graphicsSanity.lineStyle(1, 0xFFFF00, 1);
        this.graphicsSanity.drawRect(0, 105, 100, 15);
        this.graphicsSanity.endFill();

        this.graphicsHealth.fixedToCamera = true;
        this.graphicsHunger.fixedToCamera = true;
        this.graphicsSanity.fixedToCamera = true;

        this.graphicsHealthValue = game.add.graphics(100, 15);
        this.graphicsHealthValue.lineStyle(2, 0xFFFF00, 0);
        this.graphicsHealthValue.beginFill(0xFF700B, 1);
        this.graphicsHealthValue.drawRect(0, 45, 100, 15);
        this.graphicsHealthValue.endFill();

        this.graphicsHungerValue = game.add.graphics(100, 15);
        this.graphicsHungerValue.lineStyle(2, 0xFFFF00, 0);
        this.graphicsHungerValue.beginFill(0xFF700B, 1);
        this.graphicsHungerValue.drawRect(0, 75, 100, 15);
        this.graphicsHungerValue.endFill();

        this.graphicsSanityValue = game.add.graphics(100, 15);
        this.graphicsSanityValue.lineStyle(2, 0xFFFF00, 0);
        this.graphicsSanityValue.beginFill(0xFF700B, 1);
        this.graphicsSanityValue.drawRect(0, 105, 100, 15);
        this.graphicsSanityValue.endFill();



        this.graphicsHealthValue.fixedToCamera = true;
        this.graphicsHungerValue.fixedToCamera = true;
        this.graphicsSanityValue.fixedToCamera = true;

    }

    updateHealth(health) {
        this.graphicsHealthValue.clear();
        this.graphicsHealthValue.lineStyle(2, 0xFFFF00, 0);
        this.graphicsHealthValue.beginFill(0xFF700B, 1);
        this.graphicsHealthValue.drawRect(0, 45, health, 15);
        this.graphicsHealthValue.endFill();
    }


}
