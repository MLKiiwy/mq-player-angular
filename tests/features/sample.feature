Feature: Example feature
  As a user of MicroMQ
  I want to use a quizz player to play a quizz

  Scenario: Load the quizz player without quizz
    Given I am a MqUser on the player test app in "english"
    Then I should see the quizz player
    And I should see "No quizz given" in the quizz player

#  Scenario: Load a quizz into the player
#    Given I am a MqUser on the player test app in "english"
#    When I set http-latency to 1s
#    And I choose the "sample-quizz-1"
#    Then I should see "Loading" in the quizz player
#    When I wait 1s
#    Then I should see the quizz title "Sample quizz 1"