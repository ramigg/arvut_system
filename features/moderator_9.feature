Feature: Manage Articles
  In order to make a content
  As a moderator
  I want to create and manage articles

  Scenario Outline: Only Moderator and Administrator can create article
    Given the following user records
    | email               | password | role               |
    | admin@gmail.com     | secret   | Admin, Regular     |
    | moderator@gmail.com | secret   | Moderator, Regular |
    | rami@gmail.com      | secret   | Regular            |
    Given I am logged in as "<login>" with password "secret"
    When I click link "Create article"
    Then I should "<action>"

    Examples:
      | login       | action            |
      | admin       | see "New article" |
      | moderator   | see "New article" |
      | rami        | not see "New article" |
      |             | not see "New article" |
