class HUD {
    constructor(game) {
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
        this.graphicsHealth.lineStyle(1, 0x0000FF, 1);
        this.graphicsHealth.drawRect(0, 45, 100, 15);
        this.graphicsHealth.endFill();

        this.graphicsHunger = game.add.graphics(100, 15);
        this.graphicsHunger.lineStyle(1, 0x0000FF, 1);
        this.graphicsHunger.drawRect(0, 75, 100, 15);
        this.graphicsHunger.endFill();

        this.graphicsSanity = game.add.graphics(100, 15);
        this.graphicsSanity.lineStyle(1, 0x0000FF, 1);
        this.graphicsSanity.drawRect(0, 105, 100, 15);
        this.graphicsSanity.endFill();

        this.graphicsHealth.fixedToCamera = true;
        this.graphicsHunger.fixedToCamera = true;
        this.graphicsSanity.fixedToCamera = true;

    }

}
